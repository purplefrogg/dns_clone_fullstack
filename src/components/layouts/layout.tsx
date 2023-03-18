import { type FC, type PropsWithChildren } from 'react'
import { Footer } from '../elements/footer'
import { Header } from '../elements/header'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='m-auto max-w-6xl '>{children}</main>
      <Footer />
    </>
  )
}
