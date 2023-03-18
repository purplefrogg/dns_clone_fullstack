import { createTRPCRouter } from '~/server/api/trpc'
import { getAll, getProducts, getCategory } from './routes'

export const categoryRouter = createTRPCRouter({
  getAll,
  getCategory,
  getProducts,
})
