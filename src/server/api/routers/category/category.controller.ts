import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getCrumbs } from '../../shared/getCrumbs'
import { getProductsSchema } from './category.dto'
import { categoryService } from './category.service'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({}) => {
    const categories = await categoryService.getCategory({
      input: {
        onlyOneLevel: {
          level: '1',
        },
      },
    })

    return { categories, crumbs: [{ text: 'Catalog', to: '/catalog' }] }
  }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await categoryService.getBySlug(input)
  }),
  getProducts: publicProcedure
    .input(getProductsSchema)
    .query(async ({ input, ctx }) => {
      const category = await ctx.prisma.category.findUniqueOrThrow({
        where: {
          slug: input.slug,
        },
        include: {
          products: {
            where: {
              price: {
                gte: input.minPrice,
                lte: input.maxPrice,
              },

              AND: input.filter.map((filter) => ({
                FieldValue: {
                  some: {
                    field: {
                      about: {
                        slug: filter.key,
                      },
                    },
                    value: {
                      in: filter.value,
                    },
                  },
                },
              })),
            },
            select: {
              id: true,
              price: true,
            },
          },
        },
      })

      const properties = await ctx.prisma.property.findMany({
        include: {
          title: true,

          field: {
            include: {
              FieldValue: {
                where: {
                  Product: {
                    some: {
                      id: {
                        in: category.products.map((product) => product.id),
                      },
                    },
                  },
                },
              },
              about: true,
            },
            where: {
              FieldValue: {
                some: {
                  Product: {
                    some: {
                      id: {
                        in: category.products.map((product) => product.id),
                      },
                    },
                  },
                },
              },
            },
          },
        },

        where: {
          field: {
            some: {
              FieldValue: {
                some: {
                  Product: {
                    some: {
                      id: {
                        in: category.products.map((product) => product.id),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      const crumbs = await getCrumbs({
        categorySlug: category.slug,
      })
      const productMaxPrice = Math.max(
        ...category.products.map((product) => product.price)
      )
      const productMinPrice = Math.min(
        ...category.products.map((product) => product.price)
      )
      const { page, orderDirection, orderType } = input
      const take = 4
      const paginatedProducts = await ctx.prisma.product.findMany({
        where: { id: { in: category.products.map((product) => product.id) } },
        skip: page * take - take,
        take,
        orderBy: { [orderType]: orderDirection },
      })

      return {
        category,
        productCount: category.products.length,
        products: paginatedProducts,
        properties,
        productMaxPrice,
        crumbs,
        productMinPrice,
      }
    }),
})
