import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getCrumbs } from '../../shared/getCrumbs'

export const productRouter = createTRPCRouter({
  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUniqueOrThrow({
      where: { id: input },
      include: {
        category: true,

        ProductProperty: {
          include: {
            PropertyField: {
              include: { about: true, value: true },
            },
            title: true,
          },
        },
      },
    })
    const crumbs = await getCrumbs({
      categorySlug: product.category.slug,
      lastWithTo: true,
    })
    crumbs.push({ text: product.name })
    return { product, crumbs }
  }),
  getByIds: publicProcedure
    .input(z.array(z.number()).default([]))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: { in: input } },
      })
    }),
})
