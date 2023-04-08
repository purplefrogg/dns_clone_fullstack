import Head from 'next/head'
import { type FC, type PropsWithChildren } from 'react'
import { Header } from '../elements/header'
import { MobileNav } from '../elements/mobile.nav'
import { useTranslate } from '../hooks/useTrans'
import { SignModal } from '../modules/auth/signModal'
import { FloatCatalog } from '../modules/catalog/floatCatalog'

export const MobileLayout: FC<PropsWithChildren> = ({ children }) => {
  const { title } = useTranslate({ keys: ['title'] })

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header Search={<div className='flex-1'></div>} Locale={Header.Locale} />
      <FloatCatalog />
      <SignModal />
      <main className='m-auto max-w-6xl '>{children}</main>
      <MobileNav />
    </>
  )
}
