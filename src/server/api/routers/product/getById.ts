import { z } from 'zod'
import { getCrumbs } from '../../shared/getCrumbs'
import { publicProcedure } from '../../trpc'

export const getById = publicProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
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
    const crumbs = await getCrumbs(ctx.prisma, {
      categorySlug: product.category.slug,
      lastWithTo: true,
    })
    crumbs.push({ text: product.name })
    return { product, crumbs }
  })
