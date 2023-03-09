import { z } from 'zod'
import { publicProcedure } from '../../../trpc'

export const getCrumbs = publicProcedure
  .input(z.string().optional())
  .query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUniqueOrThrow({
      where: { slug: input },
      include: {
        parent: { include: { parent: true } },
      },
    })

    const crumbs: { text: string; to?: string }[] = [
      { text: 'Catalog', to: '/catalog' },
    ]
    const parent = category?.parent?.parent
    if (parent)
      crumbs.push({
        text: parent.title,
        to: `/catalog/${parent.slug}`,
      })
    if (category && category.parent) {
      crumbs.push({
        text: category.parent.title,
        to: `/catalog/${category.parent.slug}`,
      })
    }
    crumbs.push({
      text: category.title,
      to: `${crumbs.at(-1)?.to ?? '/catalog'}/${category.slug}`,
    })
    return crumbs
  })
