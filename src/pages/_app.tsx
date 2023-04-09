import { type AppProps, type AppType } from 'next/app'
import { api } from '~/utils/api'
import { Provider } from 'jotai'
import '~/utils/globals.css'
import { type NextPage } from 'next'
import { type ReactElement, type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'
import { Toaster } from '~/components/modules/toaster/toaster'
import { Layout } from '~/components/layouts/layout'
import { useIsMobile } from '../components/hooks/useIsMobile'
export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout
}
type AppPropsType = {
  session: Session | null | undefined
}

const MyApp = function ({
  Component,

  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<AppPropsType>) {
  const isMobile = useIsMobile()
  const getLayout =
    Component.getLayout ??
    ((page) => <Layout isMobile={isMobile}>{page}</Layout>)
  return (
    <SessionProvider session={session}>
      <Provider>
        <Toaster />
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </SessionProvider>
  )
} as AppType

export default api.withTRPC(MyApp)
