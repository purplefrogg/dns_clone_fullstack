import { publicProcedure } from '../../../trpc'
import { z } from 'zod'
import { type PrismaClient } from '@prisma/client'
import { getCrumbs } from '~/server/api/shared/getCrumbs'

export const getProductsInput = z.object({
  slug: z.string().optional(),
  page: z.number().default(1),
  filter: z
    .object({
      key: z.string(),
      value: z.array(z.number()),
    })
    .array()
    .default([]),
  maxPrice: z.number().optional(),
  minPrice: z.number().optional(),
  orderType: z.enum(['price']).optional().default('price').catch('price'),
  orderDirection: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .catch('asc'),
})

const getMaxPrice = async (productIds: number[], prisma: PrismaClient) => {
  const productMaxPrice = await prisma.product.findFirst({
    where: { id: { in: productIds } },
    orderBy: { price: 'desc' },
    take: 1,
    select: { price: true },
  })
  return productMaxPrice?.price
}
const getMinPrice = async (productIds: number[], prisma: PrismaClient) => {
  const productMinPrice = await prisma.product.findFirst({
    where: { id: { in: productIds } },
    orderBy: { price: 'asc' },
    take: 1,
    select: { price: true },
  })
  return productMinPrice?.price
}

interface orderedProductsInput {
  productIds: number[]
  orderType: string
  orderDirection: string
  prisma: PrismaClient

  page: number
  take?: number
}
const getFilter = async ({
  prisma,
  productIds,
}: {
  prisma: PrismaClient
  productIds: number[]
}) => {
  const propertyFields = await prisma.propertyFieldAbout.findMany({
    where: {
      PropertyField: {
        some: {
          ProductProperty: {
            productId: {
              in: productIds,
            },
          },
        },
      },
    },
  })

  const filter = propertyFields.map(async (propertyField) => {
    return {
      title: propertyField.title,
      slug: propertyField.slug,
      PropertyField: await prisma.fieldValue.findMany({
        where: {
          PropertyField: {
            some: {
              ProductProperty: {
                productId: {
                  in: productIds,
                },
              },
            },
          },
        },
        select: { id: true, value: true },
      }),
    }
  })
  return await Promise.all(filter)
}
const orderedProducts = async ({
  productIds,
  orderType,
  orderDirection,
  prisma,
  page,
  take = 4,
}: orderedProductsInput) => {
  return {
    products: await prisma.product.findMany({
      where: { id: { in: productIds } },
      orderBy: { [orderType]: orderDirection },
      include: {
        ProductProperty: true,
      },
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
    const category = await ctx.prisma.category.findFirstOrThrow({
      where: { slug: input.slug },

      include: {
        parent: { include: { parent: true } },
        _count: { select: { products: true } },
        products: {
          select: { id: true },
          where: {
            price: {
              gte: input.minPrice,
              lte: input.maxPrice,
            },
            AND: input.filter.map((filter) => ({
              ProductProperty: {
                some: {
                  PropertyField: {
                    some: {
                      about: {
                        slug: filter.key,
                      },
                      FieldValueId: { in: filter.value },
                    },
                  },
                },
              },
            })),
          },
        },
      },
    })
    const crumbs = await getCrumbs(ctx.prisma, { categorySlug: category.slug })
    const productIds = category.products.map((product) => product.id)

    const filter = await getFilter({ prisma: ctx.prisma, productIds })

    const productMaxPrice = await getMaxPrice(productIds, ctx.prisma)
    const productMinPrice = await getMinPrice(productIds, ctx.prisma)

    const ordered = await orderedProducts({
      productIds,
      orderType: input.orderType,
      orderDirection: input.orderDirection,
      prisma: ctx.prisma,
      page: input.page,
    })

    return {
      category,
      products: ordered.products,
      productCount: ordered.count,
      productMaxPrice,
      productMinPrice,
      filter,
      crumbs,
    }
  })
