import { type FC, type PropsWithChildren } from 'react'
import { Header } from './header.admin'
import { Sidebar } from './sidebar.admin'

export const LayoutAdmin: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='m-auto mt-4 flex max-w-6xl gap-4'>
        <div>
          <Sidebar />
        </div>
        <main className='block-element flex-1 overflow-x-auto'>{children}</main>
      </div>
    </>
  )
}
