import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: { parent: null },
      include: { subCategories: { include: { subCategories: true } } },
    })
  }),

  getSubCategories: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findFirst({
        where: { slug: input },
        include: { subCategories: { include: { subCategories: true } } },
      })
    }),
  // getSubCategories: publicProcedure
  //   .input(z.string())
  //   .query(async ({ ctx, input }) => {
  //     const subCategories = await ctx.prisma.category.findFirst({
  //       where: { slug: input },
  //       include: { subCategories: true },
  //     })
  //     const breadCrumbs: { text: string; to?: string }[] = [
  //       { text: 'Catalog', to: '/catalog' },
  //     ]
  //     // if (subCategories?.parent) {
  //     //   breadCrumbs.push({
  //     //     text: subCategories.parent.title,
  //     //     to: `/catalog/${subCategories.parent.slug}`,
  //     //   })
  //     // }
  //     if (subCategories?.title) breadCrumbs.push({ text: subCategories.title })
  //     return { subCategories, breadCrumbs }
  //   }),
})
