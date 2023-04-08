import { type AppProps, type AppType } from 'next/app'
import { api } from '~/utils/api'
import { Provider } from 'jotai'
import '~/utils/globals.css'
import { type NextPage } from 'next'
import { type ReactElement, type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'
import { Toaster } from '~/components/modules/toaster/toaster'
import { useIsMobile } from '~/components/hooks/useIsMobile'
import dynamic from 'next/dynamic'
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
  const Layout = isMobile
    ? dynamic(
        import('~/components/layouts/layout.mobile').then(
          (mod) => mod.MobileLayout
        )
      )
    : dynamic(import('~/components/layouts/layout').then((mod) => mod.Layout))

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
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
