import { createTRPCRouter } from '~/server/api/trpc'
import { adminRouter } from './routers/admin/admin.controller'
import { authRouter } from './routers/auth/auth.controller'
import { categoryRouter } from './routers/category/category.controller'
import { productRouter } from './routers/product/product.controller'

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
  auth: authRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
