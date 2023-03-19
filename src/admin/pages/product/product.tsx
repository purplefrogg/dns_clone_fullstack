import { type FC } from 'react'
import { ProductAdd } from './product.add'
import { ProductList } from './productList'

interface Props {
  add: boolean
}

export const ProductRoot: FC<Props> = ({ add }) => {
  if (add) return <ProductAdd />

  return <ProductList />
}
