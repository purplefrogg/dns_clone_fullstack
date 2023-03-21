import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getProductsSchema } from './category.dto'
import { categoryService } from './category.service'

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({}) => {
    const categories = await categoryService.getCategory({
      input: {
        onlyOneLevel: {
          level: '1',
        },
      },
    })

    return { categories, crumbs: [{ text: 'Catalog', to: '/catalog' }] }
  }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await categoryService.getBySlug(input)
  }),
  getProducts: publicProcedure
    .input(getProductsSchema)
    .query(async ({ input }) => categoryService.getProducts(input)),
})
