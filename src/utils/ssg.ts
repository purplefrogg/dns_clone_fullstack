import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '~/server/api/root'
import { createContextInner } from '~/server/api/trpc'
import superjson from 'superjson'

export const ssg = createProxySSGHelpers({
  router: appRouter,
  transformer: superjson,
  ctx: createContextInner(),
})
