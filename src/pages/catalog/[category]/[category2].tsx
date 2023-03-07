import { useRouter } from 'next/router'
import { z } from 'zod'

import { BreadCrumbs } from '~/components/breadCrumbs'
import { ProductItem } from '~/components/catalogPage/[catalog]/productItem'
import { Pagination } from '~/core/pagination'

import { api, type RouterInputs } from '~/utils/api'
import { type NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()

  const { category2, page = 1, orderType, orderDirection } = router.query

  const { data, error, isError } = api.category.getProducts.useQuery({
    slug: category2 as string,
    page: z.number().catch(1).parse(+page),
    orderType: orderType,
    orderDirection:
      orderDirection as RouterInputs['category']['getProducts']['orderDirection'],
  })
  const { data: crumbs } = api.category.getCrumbs.useQuery(category2 as string)

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
        <div className='w-64'>filter</div>
        {data._count.products !== 0 ? (
          <div className='flex flex-1 flex-col'>
            <div className='flex flex-col gap-4'>
              {data?.products &&
                data.products.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
            </div>
            <Pagination
              total={data?._count.products}
              pageSize={2}
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
