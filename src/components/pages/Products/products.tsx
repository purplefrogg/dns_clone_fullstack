import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { useRouterQuery } from '~/hooks/useRouterQuery'

import { api } from '~/utils/api'
import { type FC } from 'react'
import { Filter } from './components/filter/filter'
import { OrderProperty } from './components/orderProperty/orderProperty'
import { PriceProperty } from './components/priceProperty/priceProperty'
import { useAtom } from 'jotai'
import { maxPriceAtom, minPriceAtom } from './components/filter/filter.store'
import { ProductList } from './components/productList/productList'

export const Products: FC = () => {
  const { query, rest } = useRouterQuery([
    'page',
    'orderType',
    'orderDirection',
    'category2',
    'maxPrice',
    'minPrice',
    'category',
  ])

  const selectedFilters = Object.entries(rest).map(([key, value]) => {
    if (!value) return { key, value: [] }
    if (Array.isArray(value)) return { key, value: value.map((v) => +v) }
    return { key, value: [+value] }
  })
  const [, setMaxPrice] = useAtom(maxPriceAtom)
  const [, setMinPrice] = useAtom(minPriceAtom)
  const { data, error, isError } = api.category.getProducts.useQuery(
    {
      slug: query.category2,
      page: +(query.page || 1),
      filter: selectedFilters,
      orderType: query.orderType,
      minPrice: query.minPrice ? +query.minPrice : undefined,
      maxPrice: query.maxPrice ? +query.maxPrice : undefined,
      orderDirection: query.orderDirection,
    },
    {
      onSuccess: (data) => {
        setMaxPrice(data.productMaxPrice ?? 0)
        setMinPrice(data.productMinPrice ?? 0)
      },
    }
  )

  if (isError) return <div>{error.data?.code}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <BreadCrumbs crumbs={data.crumbs} />
      <div className='flex gap-4'>
        <Filter filter={data?.filter}>
          <PriceProperty />
          <OrderProperty />
        </Filter>
        <ProductList
          productCount={data.productCount}
          products={data.products}
        />
      </div>
    </>
  )
}
