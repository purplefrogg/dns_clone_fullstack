import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'
import { type AppRouter } from '~/server/api/root'
import { customLink } from './toast.link'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`
}

export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            keepPreviousData: true,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      },
      transformer: superjson,
      links: [
        customLink,
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,

          headers() {
            console.log('ctx', ctx)
            if (ctx?.req) {
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx?.req?.headers
              return {
                ...headers,
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
    }
  },
  ssr: false,
})

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
  transformer: superjson,

  links: [
    httpBatchLink({
      url: `http://localhost:3000/api/trpc`,
    }),
  ],
})
