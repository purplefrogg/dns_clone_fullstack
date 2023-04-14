import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getCrumbs } from '../../shared/getCrumbs'
import { getProductsSchema } from './category.dto'
import { categoryService } from './category.service'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await categoryService.getCategory({
      input: {
        onlyOneLevel: {
          level: '1',
        },
      },
      lang: ctx.lang,
    })

    return { categories, crumbs: [{ text: 'Catalog', to: '/catalog' }] }
  }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const category = await ctx.prisma.category.findFirstOrThrow({
      where: { slug: input },
      include: {
        locale: { where: { lang: ctx.lang } },
        parent: { include: { parent: true } },
        subCategories: {
          include: {
            locale: {
              where: {
                lang: ctx.lang,
              },
            },

            subCategories: {
              include: {
                locale: {
                  where: {
                    lang: ctx.lang,
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
      lang: ctx.lang,
    })
    return { category, crumbs }
  }),
  getProducts: publicProcedure
    .input(getProductsSchema)
    .query(async ({ input, ctx }) => {
      const productWhereInput = {
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
      }
      const category = await ctx.prisma.category.findUniqueOrThrow({
        where: {
          slug: input.slug,
        },
        include: {
          products: {
            where: productWhereInput,
            select: {
              id: true,
              price: true,
            },
          },
        },
      })

      const properties = await ctx.prisma.property.findMany({
        include: {
          title: {
            include: {
              locale: {
                where: {
                  lang: ctx.lang,
                },
              },
            },
          },

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
              about: {
                include: {
                  locale: {
                    where: {
                      lang: ctx.lang,
                    },
                  },
                },
              },
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
        lang: ctx.lang,
      })
      const productMaxPrice =
        category.products.length === 0
          ? 0
          : Math.max(...category.products.map((product) => product.price))
      const productMinPrice =
        category.products.length === 0
          ? 0
          : Math.min(...category.products.map((product) => product.price))

      const { page, orderDirection, orderType } = input
      const take = 4
      const paginatedProducts = await ctx.prisma.category.findUniqueOrThrow({
        where: { id: category.id },
        include: {
          products: {
            where: productWhereInput,
            include: {
              locale: {
                where: {
                  lang: ctx.lang,
                },
              },
            },
            skip: page * take - take,
            take,
            orderBy: { [orderType]: orderDirection },
          },
        },
      })

      return {
        category,
        productCount: category.products.length,
        products: paginatedProducts.products,
        properties,
        productMaxPrice,
        crumbs,
        productMinPrice,
      }
    }),
})
