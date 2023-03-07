import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const getCrumbs = publicProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findFirst({
      where: { id: input },
      select: {
        category: {
          include: {
            parent: {
              select: {
                title: true,
                slug: true,
                parent: true,
              },
            },
          },
        },
      },
    })
    if (!product) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Product not found',
      })
    }

    const crumbs: { text: string; to?: string }[] = [
      { text: 'Catalog', to: '/catalog' },
    ]
    const parent = product.category?.parent?.parent
    if (parent)
      crumbs.push({
        text: parent.title,
        to: `/catalog/${parent.slug}`,
      })
    if (product && product.category.parent) {
      crumbs.push({
        text: product.category.parent.title,
        to: `/catalog/${product.category.parent.slug}`,
      })
    }
    crumbs.push({
      text: product.category.title,
      to: `${crumbs.at(-1)?.to ?? '/catalog'}/${product.category.slug}`,
    })
    return crumbs
  })
