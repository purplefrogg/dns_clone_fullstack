import { useRouter } from 'next/router'
import { z } from 'zod'

import { BreadCrumbs } from '~/components/breadCrumbs'
import { ProductItem } from '~/components/catalogPage/[catalog]/productItem'
import { Pagination } from '~/core/pagination'
import { useRouterQuery } from '~/hooks/useRouterQuery'
import { Filter } from '~/modules/category/components/filter/filter'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = useRouterQuery([
    'page',
    'orderType',
    'orderDirection',
    'category2',
    'maxPrice',
    'minPrice',
  ])
  const { category2, page = 1, orderType, orderDirection } = query

  const { data, error, isError } = api.category.getProducts.useQuery({
    slug: category2,
    page: z.number().catch(1).parse(+page),
    orderType,
    minPrice: query.minPrice ? +query.minPrice : undefined,
    maxPrice: query.maxPrice ? +query.maxPrice : undefined,
    orderDirection,
  })

  const { data: crumbs } = api.category.getCrumbs.useQuery(category2)

  const onChangePage = (current: number) => {
    router.query.page = current.toString()
    void router.push({ pathname: router.pathname, query: router.query })
  }

  if (isError) return <div>{error.message}</div>
  if (!data || !crumbs) return <div>loading...</div>
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div className='flex gap-4'>
        <div className='w-64'>
          <Filter
            minPrice={data.productMinPrice?.price ?? 0}
            maxPrice={data.productMaxPrice?.price ?? 0}
          />
        </div>
        {data.category._count.products !== 0 ? (
          <div className='flex flex-1 flex-col'>
            <div className='flex flex-col gap-4'>
              {data.category?.products &&
                data.category.products.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
            </div>
            <Pagination
              total={data.category?._count.products}
              pageSize={1}
              current={+page}
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

export default Page
