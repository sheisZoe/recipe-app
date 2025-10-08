"use server";

import prisma from "@/lib/prisma";
import { Difficulty } from "@/lib/prisma/generated";
import { ProductFormInput, ProductFormSchema } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";
import { keyof } from "zod";

export async function getProducts(filters: FilterItemsProps = {}) {
  try {
    const { meal, cuisine, level, prepRange, cookRange, search } = filters;
    const DLevel = {
      hard: "Hard" as "Hard",
      medium: "Medium" as "Medium",
      easy: "Easy" as "Easy",
    };
    const levels = level?.map((l) => DLevel[l as keyof typeof DLevel]);
    const products = await prisma.product.findMany({
      where: {
        ...(search?.length
          ? {
              name: {
                contains: search[0],
                mode: "insensitive",
              },
            }
          : {}),
        ...(meal?.length
          ? {
              mealType: {
                hasSome: meal,
              },
            }
          : {}),
        ...(cuisine?.length
          ? {
              cuisine: {
                name: { in: cuisine },
              },
            }
          : {}),
        ...(levels?.length
          ? {
              difficulty: {
                in: levels,
              },
            }
          : {}),
        ...(prepRange?.length === 2
          ? {
              prepTimeMinutes: {
                gte: prepRange[0],
                lte: prepRange[1],
              },
            }
          : {}),
        ...(cookRange?.length === 2
          ? {
              cookTimeMinutes: {
                gte: cookRange[0],
                lte: cookRange[1],
              },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: {
          select: {
            id: true,
            url: true,
          },
          take: 1,
        },
        cuisine: true,
        favorite: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return products;
  } catch (error) {
    console.error("❌ getProducts error:", error);
    return [];
  }
}

export type Products = Awaited<ReturnType<typeof getProducts>>;

export async function getProduct(productId: string) {
  try {
    return await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        image: {
          select: {
            id: true,
            url: true,
          },
          take: 1,
        },
      },
    });
  } catch (error) {
    return null;
  }
}

export type Product = Awaited<ReturnType<typeof getProduct>>;

export async function getFilterData() {
  try {
    const data = await prisma.cuisine.findMany({
      select: { name: true },
      orderBy: {
        name: "asc",
      },
    });

    const data2 = await prisma.product.findMany({
      select: { mealType: true },
    });
    const mealTypes = [...new Set(data2.flatMap((c) => c.mealType ?? []))];
    const range = await prisma.product.aggregate({
      _min: {
        cookTimeMinutes: true,
        prepTimeMinutes: true,
      },
      _max: {
        cookTimeMinutes: true,
        prepTimeMinutes: true,
      },
    });
    return {
      cuisines: data?.map((c) => c.name),
      mealTypes,
      prepRange: [
        range._min?.prepTimeMinutes || 0,
        range._max?.prepTimeMinutes || 0,
      ],
      cookRange: [
        range._min?.cookTimeMinutes || 0,
        range._max?.cookTimeMinutes || 0,
      ],
    };
  } catch (error) {
    return {
      cuisines: [],
      mealTypes: [],
      prepRange: [],
      cookRange: [],
      description: [],
    };
  }
}

export type FilterData = Awaited<ReturnType<typeof getFilterData>>;

export async function getRelatedProducts(cuisine: string) {
  try {
    return await prisma.product.findMany({
      where: {
        cuisine: {
          name: cuisine,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: {
          select: {
            id: true,
            url: true,
          },
          take: 1,
        },
        cuisine: true,
        favorite: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    });
  } catch (error) {
    return [];
  }
}

export type RelatedProducts = Awaited<ReturnType<typeof getRelatedProducts>>;

export async function createProduct(
  _: any,
  data: ProductFormInput
): Promise<ActionResponse<ProductFormInput>> {
  try {
    const parsed = ProductFormSchema.safeParse(data);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return {
        fieldError: {
          name: err.fieldErrors.name?.[0],
          cuisine: err.fieldErrors.cuisine?.[0],
          tags: err.fieldErrors.tags?.[0],
          ingredients: err.fieldErrors.ingredients?.[0],
          instructions: err.fieldErrors.instructions?.[0],
          difficulty: err.fieldErrors.difficulty?.[0],
          images: err.fieldErrors.images?.[0],
        },
      };
    }
    const {
      name,
      cuisine,
      ingredients,
      instructions,
      tags,
      images,
      difficulty,
    } = data;
    const cusId = await prisma.cuisine.findFirst({
      where: {
        name: cuisine,
      },
    });
    if (!cusId) {
      throw new Error("Cuisine not found");
    }
    await prisma.$transaction(async (tx) => {
      const pr = await tx.product.create({
        data: {
          name,
          slug: name.toLowerCase().replaceAll(" ", "-"),
          description: "",
          cuisine: {
            connect: {
              id: cusId.id,
            },
          },
          tags,
          difficulty: difficulty as Difficulty,
          ingredients,
          instructions,
        },
      });
      for (let i of images) {
        await prisma.image.create({
          data: {
            url: i.url,
            thumbnailUrl: i.thumbnailUrl!,
            fileId: i.fileId,
            filePath: i.filePath!,
            product: {
              connect: {
                id: pr.id,
              },
            },
          },
        });
      }
    });
    revalidatePath("/");
    return {
      data: true,
    };
  } catch (error) {
    console.log(error);
    return {
      formError: "Error occurred",
    };
  }
}

export async function handleLike(productId:string){
  try {
    if(!productId) throw Error("Invalid product ID")
    const fav = await prisma.favorite.findFirst({
      where: {
        productId
      },
      select: {
        id: true
      }
    })
    if(fav){
      await prisma.favorite.delete({
        where: {
          id: fav.id
        }
      })
      return "Product removed successfully"
    }
    else {
      await prisma.favorite.create({
        data: {
          products: {
            connect: {
              id: productId
            }
          }
        }
      })
      return "Product liked successfully"
    }
  } catch (error) {
    throw Error("Error occuried")
  }
}