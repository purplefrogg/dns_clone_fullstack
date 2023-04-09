// import dynamic from 'next/dynamic'
import Head from 'next/head'
import { type FC, type PropsWithChildren } from 'react'
import { useTranslate } from '../hooks/useTrans'
import { Header } from '../elements/header'
import dynamic from 'next/dynamic'

const FloatCatalog = dynamic(
  import('../modules/catalog/floatCatalog').then((mod) => mod.FloatCatalog)
)

const MobileNav = dynamic(
  import('../elements/mobile.nav').then((mod) => mod.MobileNav)
)

const SignModal = dynamic(
  import('../modules/auth/signModal').then((mod) => mod.SignModal)
)

const Footer = dynamic(import('../elements/footer').then((mod) => mod.Footer))
export const Layout: FC<PropsWithChildren & { isMobile: boolean }> = ({
  children,
  isMobile,
}) => {
  const { title } = useTranslate({ keys: ['title'] })

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        Search={isMobile ? <div className='flex-1'></div> : Header.Search}
        Locale={Header.Locale}
      />
      <FloatCatalog />
      <SignModal />
      <main className='m-auto max-w-6xl '>{children}</main>
      {isMobile && <MobileNav />}
      {!isMobile && <Footer />}
    </>
  )
}
