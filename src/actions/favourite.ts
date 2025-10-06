import prisma from "@/lib/prisma";

export async function getFavorites() {
  try {
    const LikedProducts = await prisma.favorite.findMany({
      select: {
        products: {
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
        },
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
    return LikedProducts
  } catch (error) {
    return []
  }

 
}
