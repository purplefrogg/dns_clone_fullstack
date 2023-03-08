import { type AppProps, type AppType } from 'next/app'

import { api } from '~/utils/api'
import { Provider } from 'jotai'
import '~/styles/globals.css'
import { Layout } from '~/core/layout'
import { type NextPage } from 'next'
import { type ReactElement, type ReactNode } from 'react'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = function ({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
} as AppType

export default api.withTRPC(MyApp)
