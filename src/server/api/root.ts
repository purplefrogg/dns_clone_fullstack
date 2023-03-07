import { createTRPCRouter } from '~/server/api/trpc'
import { categoryRouter } from './routers/category/categoryRouter'
import { productRouter } from './routers/product/productRouter'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
