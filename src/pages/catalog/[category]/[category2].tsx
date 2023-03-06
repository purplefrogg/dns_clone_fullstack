import { useRouter } from 'next/router'
import { BreadCrumbs } from '~/components/breadCrumbs'
import { ProductItem } from '~/components/catalogPage/[catalog]/productItem'
import { Pagination } from '~/core/pagination'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category2, page = 1 } = router.query

  const { data } = api.category.getProducts.useQuery({
    slug: category2 as string,
    page: +page,
  })
  const { data: crumbs } = api.category.getCrumbs.useQuery(category2 as string)

  const onChangePage = (current: number) => {
    router.query.page = current.toString()
    void router.push({ pathname: router.pathname, query: router.query })
  }

  if (!data || !crumbs) return <div>loading...</div>
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div className='flex gap-4'>
        <div className='w-64'>filter</div>
        <div className='flex flex-1 flex-col'>
          <div className='flex flex-col gap-4'>
            {data?.products &&
              data.products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
          </div>
          <Pagination
            total={data?._count.products}
            pageSize={1}
            current={+page}
            onChange={onChangePage}
          />
        </div>
      </div>
    </>
  )
}

export default Page
