import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const getByIds = publicProcedure
  .input(z.array(z.number()).default([]))
  .query(async ({ ctx, input }) => {
    return ctx.prisma.product.findMany({
      where: { id: { in: input } },
      include: {
        category: true,
        ProductProperty: {
          select: { PropertyField: true, title: true },
        },
      },
    })
  })
