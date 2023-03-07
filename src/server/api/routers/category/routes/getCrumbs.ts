import { z } from 'zod'
import { publicProcedure } from '../../../trpc'

export const getCrumbs = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUnique({
      where: { slug: input },
      include: {
        parent: { include: { parent: true } },
      },
    })
    if (!category) throw new Error('Category not found')

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
