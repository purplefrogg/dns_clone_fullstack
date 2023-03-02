import { type FC, type PropsWithChildren } from 'react'
import { BreadCrumbs } from './breadCrumbs'

export const LayoutCatalog: FC<PropsWithChildren> = ({ children }) => {
  console.log('render')

  return (
    <>
      <BreadCrumbs />
      {children}
    </>
  )
}
