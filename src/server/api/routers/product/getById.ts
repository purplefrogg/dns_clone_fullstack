import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const getById = publicProcedure
  .input(z.number())
  .query(({ ctx, input }) => {
    return ctx.prisma.product.findUnique({
      where: { id: input },
      include: {
        category: true,
        ProductProperty: {
          select: { PropertyField: true, title: true },
        },
      },
    })
  })
