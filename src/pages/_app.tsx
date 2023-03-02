import { type AppProps, type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Layout } from '~/components/layout'
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

  return getLayout(<Component {...pageProps} />)
}

export default api.withTRPC(MyApp as AppType)
