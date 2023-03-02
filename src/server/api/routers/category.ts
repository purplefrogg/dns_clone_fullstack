import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: { parent: null },
      include: { subCategories: { include: { subCategories: true } } },
    })
  }),

  getSubCategories: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findFirst({
        where: { slug: input },
        include: { subCategories: true },
      })
    }),
})
