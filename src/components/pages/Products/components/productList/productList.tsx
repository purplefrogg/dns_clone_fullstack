import { Pagination } from '~/components/elements/pagination'
import { useRouterQuery } from '~/components/hooks/useRouterQuery'

import { type RouterOutputs } from '~/utils/api'
import { type FC } from 'react'
import { ProductItem } from './productList.item'

interface Props {
  products: RouterOutputs['category']['getProducts']['products']
  productCount: number
}

export const ProductList: FC<Props> = ({ products, productCount }) => {
  const { router, query } = useRouterQuery(['page'])

  const onChangePage = (current: number) => {
    router.query.page = current.toString()
    void router.push({ pathname: router.pathname, query: router.query })
  }

  return (
    <>
      {productCount !== 0 ? (
        <div className='flex flex-1 flex-col'>
          <div className='flex flex-col gap-4'>
            {products &&
              products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
          </div>
          <Pagination
            total={productCount}
            pageSize={4}
            current={+(query.page || 1)}
            onChange={onChangePage}
          />
        </div>
      ) : (
        <div className='text-2xl'>no products</div>
      )}
    </>
  )
}
