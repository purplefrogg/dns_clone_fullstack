import { type FC } from 'react'
import { ProductAdd } from './product.add'
import { ProductList } from './productList'

export const ProductRoot: FC = () => {
  return (
    <>
      <ProductAdd />
      <ProductList />
    </>
  )
}
