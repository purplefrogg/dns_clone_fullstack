import { type FC, type PropsWithChildren } from 'react'
import { Header } from './header.admin'
import { Sidebar } from './sidebar.admin'

export const LayoutAdmin: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='m-auto flex max-w-6xl '>
        <Sidebar />
        <main className=''>{children}</main>
      </div>
    </>
  )
}
