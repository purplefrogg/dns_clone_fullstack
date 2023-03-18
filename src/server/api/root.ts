import { createTRPCRouter } from '~/server/api/trpc'
import { authRouter } from './routers/auth/authRouter'
import { categoryRouter } from './routers/category/categoryRouter'
import { productRouter } from './routers/product/productRouter'

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
