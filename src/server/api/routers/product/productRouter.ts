import { createTRPCRouter } from '~/server/api/trpc'
import { getById } from './getById'
import { getByIds } from './getByIds'
import { getCrumbs } from './getCrumbs'

export const productRouter = createTRPCRouter({
  getCrumbs,
  getById: getById,
  getByIds: getByIds,
})
