import { type FC, type PropsWithChildren } from 'react'
import { Footer } from '../elements/footer'
import { Header } from '../elements/header'
import { SignModal } from '../modules/auth/signModal'
import { FloatCatalog } from '../modules/catalog/floatCatalog'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <FloatCatalog />
      <SignModal />
      <main className='m-auto max-w-6xl '>{children}</main>
      <Footer />
    </>
  )
}
