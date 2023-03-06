import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  getByCategory: publicProcedure
    .input(
      z.object({ slug: z.string(), page: z.number().optional().default(0) })
    )

    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { category: { slug: input.slug } },
        take: 4,
        skip: input.page - 1,

        include: {
          ProductProperty: true,
        },
      })
    }),
  getCrumbs: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
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
    return ctx.prisma.product.findUnique({
      where: { id: input },
      include: {
        category: true,
        ProductProperty: {
          select: { PropertyField: true, title: true },
        },
      },
    })
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
