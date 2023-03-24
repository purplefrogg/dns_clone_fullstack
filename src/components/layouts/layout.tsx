import { type FC, type PropsWithChildren } from 'react'
import { Footer } from '../elements/footer'
import { Header } from '../elements/header'
import { FloatCatalog } from '../modules/catalog/floatCatalog'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <FloatCatalog />
      <main className='m-auto max-w-6xl '>{children}</main>
      <Footer />
    </>
  )
}
