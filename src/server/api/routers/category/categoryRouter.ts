import { createTRPCRouter } from '~/server/api/trpc'
import { getAll } from './routes'
import { getCrumbs } from './routes'
import { getProducts } from './routes'
import { getSubCategories } from './routes'

export const categoryRouter = createTRPCRouter({
  getAll,
  getSubCategories,
  getCrumbs,
  getProducts,
})
