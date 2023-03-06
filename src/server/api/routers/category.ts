import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      where: { parent: null },
      include: { subCategories: { include: { subCategories: true } } },
    })
    return { categories, crumbs: [{ text: 'Catalog', to: '/catalog' }] }
  }),

  getSubCategories: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.category.findUnique({
        where: { slug: input },
        include: {
          parent: { include: { parent: true } },
          subCategories: { include: { subCategories: true } },
        },
      })
    }),
  getCrumbs: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
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
    crumbs.push({ text: category.title })
    return crumbs
  }),
  getProducts: publicProcedure
    .input(
      z.object({ slug: z.string(), page: z.number().optional().default(0) })
    )
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: { slug: input.slug },
        include: {
          parent: { include: { parent: true } },
          _count: { select: { products: true } },
          products: {
            take: 1,
            skip: input.page - 1,
          },
        },
      })
      return category
    }),
})
