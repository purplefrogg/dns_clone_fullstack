import { createTRPCRouter } from '../../trpc'
import { categoriesRouter } from './categories'
import { adminProductsRouter } from './products'

export const adminRouter = createTRPCRouter({
  ...adminProductsRouter,
  ...categoriesRouter,
})
