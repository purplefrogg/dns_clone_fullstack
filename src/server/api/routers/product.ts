import { TRPCError } from '@trpc/server'
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
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Category not found',
        })
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
        include: { ProductProperty: true },
      })
      return { product, crumbs }
    }),

  getFilter: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findFirst({
      where: { slug: input },
    })
    if (!category) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Category not found',
      })
    }

    const product = await ctx.prisma.product.findMany({
      where: { categoryId: category.id },
      select: { ProductProperty: true, id: true },
    })

    return { product }
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
