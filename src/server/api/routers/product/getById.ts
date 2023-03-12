import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const getById = publicProcedure
  .input(z.number())
  .query(({ ctx, input }) => {
    return ctx.prisma.product.findUniqueOrThrow({
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
  })
