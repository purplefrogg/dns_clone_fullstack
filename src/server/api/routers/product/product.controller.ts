import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getCrumbs } from '../../shared/getCrumbs'

export const productRouter = createTRPCRouter({
  search: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const products = await ctx.prisma.product.findMany({
      where: {
        locale: {
          some: {
            name: {
              contains: input,
              mode: 'insensitive',
            },
          },
        },
      },
      include: {
        category: true,
        locale: {
          where: {
            lang: ctx.lang,
          },
        },
      },
    })
    return products
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        lang: z.enum(['ru', 'en']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const language =
        input.lang === 'en' ? 'EN' : input.lang === 'ru' ? 'RU' : ctx.lang
      const product = await ctx.prisma.product.findUniqueOrThrow({
        where: { id: input.id },
        include: {
          category: true,
          locale: {
            where: {
              lang: language,
            },
          },
        },
      })

      const properties = await ctx.prisma.property.findMany({
        include: {
          title: {
            include: {
              locale: true,
            },
          },
          field: {
            include: {
              about: {
                include: {
                  locale: {
                    where: {
                      lang: ctx.lang,
                    },
                  },
                },
              },
              FieldValue: {
                take: 1,

                where: {
                  Product: {
                    some: {
                      id: input.id,
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
                      id: input.id,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const crumbs = await getCrumbs({
        lang: language,
        categorySlug: product.category.slug,
        lastWithTo: true,
      })
      if (product.locale[0]?.name)
        crumbs.push({ text: product.locale[0]?.name })
      return { product, crumbs, properties }
    }),
  getByIds: publicProcedure
    .input(z.array(z.number()).default([]))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: { in: input } },
        include: {
          locale: {
            where: {
              lang: ctx.lang,
            },
          },
        },
      })
    }),
})
