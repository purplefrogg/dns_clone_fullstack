import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  getByCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: { slug: input },
        include: { parent: { include: { parent: true } } },
      })
      if (!category) {
        return null
      }
      const crumbs = [{ text: 'Catalog', to: '/catalog' }]
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

      const product = await ctx.prisma.product.findMany({
        where: { categoryId: category.id },
      })
      return { product, crumbs }
    }),

  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.product.findFirst({ where: { id: input } })
  }),
  getCategoryOfProduct: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      const nestedCategory = ctx.prisma.product.findFirst({
        where: { id: input },
        select: {
          category: {
            select: {
              title: true,
              slug: true,
              parent: { select: { title: true, slug: true, parent: true } },
            },
          },
        },
      })

      return nestedCategory
    }),
})
