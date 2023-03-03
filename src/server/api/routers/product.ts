import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  getByCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: { slug: input },
      })
      if (!category) {
        return null
      }
      return ctx.prisma.product.findMany({
        where: { categoryId: category.id },
      })
    }),

  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.product.findFirst({ where: { id: input } })
  }),
  getCategoryOfProduct: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      const nestedCategory = ctx.prisma.product.findFirst({
        where: { id: input },
        select: {
          category: {
            select: {
              title: true,
              slug: true,
              parent: { select: { title: true, slug: true, parent: true } },
            },
          },
        },
      })

      return nestedCategory
    }),
})
