import { type Prisma } from '@prisma/client'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { getCrumbs } from '../../shared/getCrumbs'
import {
  type getProductsSchema,
  type getCategoriesSchema,
} from './category.dto'

const getMaxPrice = async (productIds: number[]) => {
  const productMaxPrice = await prisma.product.findFirst({
    where: { id: { in: productIds } },
    orderBy: { price: 'desc' },
    take: 1,
    select: { price: true },
  })
  return productMaxPrice?.price
}
const getMinPrice = async (productIds: number[]) => {
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

  page: number
  take?: number
}
const getFilter = async ({ productIds }: { productIds: number[] }) => {
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
const getProducts = async (input: z.infer<typeof getProductsSchema>) => {
  const category = await prisma.category.findFirstOrThrow({
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
  const crumbs = await getCrumbs({
    categorySlug: category.slug,
  })
  const productIds = category.products.map((product) => product.id)

  const filter = await getFilter({ productIds })

  const productMaxPrice = await getMaxPrice(productIds)
  const productMinPrice = await getMinPrice(productIds)

  const ordered = await orderedProducts({
    productIds,
    orderType: input.orderType,
    orderDirection: input.orderDirection,

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
}
const getCategoryArgsWhere = (
  input: z.infer<typeof getCategoriesSchema>
): Prisma.CategoryWhereInput | undefined => {
  if (typeof input === 'string')
    return {
      title: {
        contains: input,
        mode: 'insensitive',
      },
    }
  if (input?.onlyOneLevel?.level === '1') {
    if (input.onlyOneLevel.reverse)
      return {
        NOT: {
          parentId: null,
        },
      }
    return {
      parentId: null,
    }
  }

  if (input?.onlyOneLevel?.level === '3') {
    if (input.onlyOneLevel.reverse)
      return {
        subCategories: {
          some: {
            parentId: {
              not: null,
            },
          },
        },
      }

    return {
      NOT: {
        subCategories: {
          some: {
            parentId: {
              not: null,
            },
          },
        },
      },
    }
  }
}
const getCategory = ({
  input,
}: {
  input: z.infer<typeof getCategoriesSchema>
}) => {
  return prisma.category.findMany({
    where: categoryService.getCategoryArgsWhere(input),
    include: {
      subCategories: {
        include: {
          subCategories: true,
        },
      },
    },
  })
}
const getBySlug = async (slug: string) => {
  const category = await prisma.category.findFirstOrThrow({
    where: { slug },
    include: {
      parent: { include: { parent: true } },
      subCategories: { include: { subCategories: true } },
    },
  })

  const crumbs = await getCrumbs({ categorySlug: category.slug })
  return { category, crumbs }
}

export const categoryService = {
  getCategoryArgsWhere,
  getCategory,
  getProducts,
  getBySlug,
}
