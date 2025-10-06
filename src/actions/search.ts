"use server";

import prisma from "@/lib/prisma";

export async function getProducts(search: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            cuisine: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            mealType: {
              hasSome: [search],
            },
          },
        ],
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
      take: 7,
    });
    return products;
  } catch (error) {
    console.error("❌ getProducts error:", error);
    return [];
  }
}

export type SearchRecipes = Awaited<ReturnType<typeof getProducts>>;

export async function getSearchSuggested() {
  try {
    const data = await prisma.cuisine.findMany({
      select: { name: true },
      orderBy: {
        name: "asc",
      },
      take: 10,
    });

    const data2 = await prisma.product.findMany({
      select: { mealType: true },
      take: 15,
    });
    const mealTypes = [...new Set(data2.flatMap((c) => c.mealType ?? []))];
    return {
      cuisines: data?.map((c) => c.name),
      mealTypes,
    };
  } catch (error) {
    return {
      cuisines: [],
      mealTypes: [],
    };
  }
}

export type SearchSuggested = Awaited<ReturnType<typeof getSearchSuggested>>;
