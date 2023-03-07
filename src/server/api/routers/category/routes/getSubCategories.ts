import { z } from 'zod'
import { publicProcedure } from '~/server/api/trpc'

export const getSubCategories = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.prisma.category.findUnique({
      where: { slug: input },
      include: {
        parent: { include: { parent: true } },
        subCategories: { include: { subCategories: true } },
      },
    })
  })
