"use server";

import prisma from "@/lib/prisma";

export async function getHomeProducts() {
  try {
    const trending = await prisma.product.findMany({
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
      take: 10,
    });
    const featured = await prisma.product.findMany({
      where: {
        cuisine: {
          name: "Nigerian",
        },
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
    return {
      featured,
      trending,
    };
  } catch (error) {
    return {
      featured: [],
      trending: [],
    };
  }
}

export type HomeData = Awaited<ReturnType<typeof getHomeProducts>>;
