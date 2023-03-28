import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { type FC, type PropsWithChildren } from 'react'
import { Footer } from '../elements/footer'
import { Header } from '../elements/header'
import { SignModal } from '../modules/auth/signModal'
import { FloatCatalog } from '../modules/catalog/floatCatalog'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('common')
  const title = t('title')
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <FloatCatalog />
      <SignModal />
      <main className='m-auto max-w-6xl '>{children}</main>
      <Footer />
    </>
  )
}
