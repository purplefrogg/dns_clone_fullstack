import { z } from 'zod'

import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { Pagination } from '~/core/pagination'
import { useRouterQuery } from '~/hooks/useRouterQuery'

import { api } from '~/utils/api'
import { type FC } from 'react'
import { Filter } from './components/filter/filter'
import { ProductItem } from './productList.item'
import { OrderProperty } from './components/filter/orderProperty'
import { PriceProperty } from './components/filter/priceProperty'
import { useAtom } from 'jotai'
import { maxPriceAtom, minPriceAtom } from './components/filter/filter.store'

export const ProductList: FC = () => {
  const { router, query, rest } = useRouterQuery([
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
      page: z
        .number()
        .catch(1)
        .parse(+(query.page || 1)),
      filter: selectedFilters,
      orderType: query.orderType,
      minPrice: query.minPrice ? +query.minPrice : undefined,
      maxPrice: query.maxPrice ? +query.maxPrice : undefined,
      orderDirection: query.orderDirection,
    },
    {
      keepPreviousData: true,
      onSuccess(data) {
        setMaxPrice(data.productMaxPrice ?? 0)
        setMinPrice(data.productMinPrice ?? 0)
      },
    }
  )

  const onChangePage = (current: number) => {
    router.query.page = current.toString()
    void router.push({ pathname: router.pathname, query: router.query })
  }

  if (isError) return <div>{error.message}</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <BreadCrumbs crumbs={data.crumbs} />
      <div className='flex gap-4'>
        <div className='w-64'>
          <Filter filter={data?.filter}>
            <PriceProperty />
            <OrderProperty />
          </Filter>
        </div>
        {data.category._count.products !== 0 ? (
          <div className='flex flex-1 flex-col'>
            <div className='flex flex-col gap-4'>
              {data?.products &&
                data.products.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
            </div>
            <Pagination
              total={data.productCount}
              pageSize={4}
              current={+(query.page || 1)}
              onChange={onChangePage}
            />
          </div>
        ) : (
          <div className='text-2xl'>no products</div>
        )}
      </div>
    </>
  )
}
