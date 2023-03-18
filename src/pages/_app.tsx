import { type AppProps, type AppType } from 'next/app'

import { api } from '~/utils/api'
import { Provider } from 'jotai'
import '~/styles/globals.css'

import { type NextPage } from 'next'
import { type ReactElement, type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'
import { Layout } from '~/components/layouts/layout'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = function ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <SessionProvider session={session as Session | null | undefined}>
      <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
    </SessionProvider>
  )
} as AppType

export default api.withTRPC(MyApp)
