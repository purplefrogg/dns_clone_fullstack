import { createTRPCRouter } from '~/server/api/trpc'
import { getById } from './getById'
import { getByIds } from './getByIds'

export const productRouter = createTRPCRouter({
  getById,
  getByIds,
})
