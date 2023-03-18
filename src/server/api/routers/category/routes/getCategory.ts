import { z } from 'zod'
import { getCrumbs } from '~/server/api/shared/getCrumbs'
import { publicProcedure } from '~/server/api/trpc'

export const getCategory = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findFirstOrThrow({
      where: { slug: input },
      include: {
        parent: { include: { parent: true } },
        subCategories: { include: { subCategories: true } },
      },
    })

    const crumbs = await getCrumbs(ctx.prisma, { categorySlug: category.slug })
    return { category, crumbs }
  })
