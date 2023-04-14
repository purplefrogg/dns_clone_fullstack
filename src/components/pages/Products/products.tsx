import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { useRouterQuery } from '~/components/hooks/useRouterQuery'

import { api } from '~/utils/api'
import { type FC } from 'react'
import { Filter } from './components/filter/filter'
import { OrderProperty } from './components/orderProperty/orderProperty'
import { PriceProperty } from './components/priceProperty/priceProperty'
import { useAtom, useSetAtom } from 'jotai'
import {
  FilterHiddenAtom,
  maxPriceAtom,
  minPriceAtom,
} from './components/filter/filter.store'
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
    if (Array.isArray(value)) return { key, value }
    return { key, value: [value] }
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
        console.log(data)

        setMaxPrice(data.productMaxPrice)
        setMinPrice(data.productMinPrice)
      },
    }
  )
  const hideFilter = useSetAtom(FilterHiddenAtom)

  if (isError) return <div>{error.data?.code}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <BreadCrumbs crumbs={data.crumbs} />
      <div className='flex justify-between md:hidden'>
        <OrderProperty />
        <button onClick={() => hideFilter((p) => !p)}>filters</button>
      </div>
      <div className='flex gap-4'>
        <Filter filter={data?.properties}>
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
