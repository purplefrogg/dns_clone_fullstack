import { type FC, type PropsWithChildren } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='m-auto max-w-6xl'>{children}</main>
      <Footer />
    </>
  )
}
