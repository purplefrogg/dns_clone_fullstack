import { publicProcedure } from '../../../trpc'
import { z } from 'zod'
import { type PrismaClient } from '@prisma/client'

export const getProductsInput = z.object({
  slug: z.string().optional(),
  page: z.number(),
  maxPrice: z.number().optional(),
  minPrice: z.number().optional(),
  orderType: z.enum(['price']).optional().default('price').catch('price'),
  orderDirection: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .catch('asc'),
})

const getMaxMinPrice = async (productIds: number[], prisma: PrismaClient) => {
  const productMinPrice = await prisma.product.findFirst({
    where: { id: { in: productIds } },
    orderBy: { price: 'asc' },
    take: 1,
    select: { price: true },
  })
  const productMaxPrice = await prisma.product.findFirst({
    where: { id: { in: productIds } },
    orderBy: { price: 'desc' },
    take: 1,
    select: { price: true },
  })
  return { productMaxPrice, productMinPrice }
}

interface orderedProductsInput {
  productIds: number[]
  orderType: string
  orderDirection: string
  prisma: PrismaClient

  page: number
  take?: number
}

const orderedProducts = async ({
  productIds,
  orderType,
  orderDirection,
  prisma,
  page,
  take = 1,
}: orderedProductsInput) => {
  return {
    products: await prisma.product.findMany({
      where: { id: { in: productIds } },
      orderBy: { [orderType]: orderDirection },
      skip: page * take - take,
      take,
    }),
    count: await prisma.product.count({
      where: { id: { in: productIds } },
    }),
  }
}
export const getProducts = publicProcedure
  .input(getProductsInput)
  .query(async ({ ctx, input }) => {
    console.log(input.minPrice)

    const category = await ctx.prisma.category.findFirstOrThrow({
      where: { slug: input.slug },
      include: {
        parent: { include: { parent: true } },
        _count: { select: { products: true } },
        products: {
          where: {
            price: {
              gte: input.minPrice,
              lte: input.maxPrice,
            },
          },
        },
      },
    })
    const productIds = category.products.map((product) => product.id)
    const { productMaxPrice, productMinPrice } = await getMaxMinPrice(
      productIds,
      ctx.prisma
    )

    const ordered = await orderedProducts({
      productIds,
      orderType: input.orderType,
      orderDirection: input.orderDirection,
      prisma: ctx.prisma,
      page: input.page,
    })

    category.products = ordered.products
    category._count.products = ordered.count

    return { category, productMaxPrice, productMinPrice }
  })
