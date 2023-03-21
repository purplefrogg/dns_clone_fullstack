import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.array(z.number()).default([]))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: { in: input } },
      })
    }),
  getByIds: publicProcedure
    .input(z.array(z.number()).default([]))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: { in: input } },
      })
    }),
})
