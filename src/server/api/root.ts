import { createTRPCRouter } from '~/server/api/trpc'
import { adminRouter } from './routers/admin/adminRouter'
import { authRouter } from './routers/auth/authRouter'
import { categoryRouter } from './routers/category/categoryRouter'
import { productRouter } from './routers/product/productRouter'

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
  auth: authRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
