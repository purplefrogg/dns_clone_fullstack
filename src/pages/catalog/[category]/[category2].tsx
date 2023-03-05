import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BreadCrumbs } from '~/components/breadCrumbs'
import { ProductItem } from '~/components/catalogPage/[catalog]/productItem'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()

  const { category2 } = router.query
  if (typeof category2 !== 'string') {
    return null
  }
  const { data } = api.product.getByCategory.useQuery(category2.toString())

  if (!data) {
    return <div>loading...</div>
  }
  const { product, crumbs } = data
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div className='flex gap-4'>
        <div className='w-64'>filter</div>
        <div className='flex flex-1 flex-col gap-4'>
          {product &&
            product.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
        </div>
      </div>
    </>
  )
}

export default Page
