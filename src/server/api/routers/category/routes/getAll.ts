import { publicProcedure } from '~/server/api/trpc'

export const getAll = publicProcedure.query(async ({ ctx }) => {
  const categories = await ctx.prisma.category.findMany({
    where: { parent: null },
    include: { subCategories: { include: { subCategories: true } } },
  })
  return { categories, crumbs: [{ text: 'Catalog', to: '/catalog' }] }
})
