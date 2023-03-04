import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BreadCrumbs } from '~/components/breadCrumbs'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category2 } = router.query
  if (typeof category2 !== 'string') {
    return null
  }
  const { data, isLoading } = api.product.getByCategory.useQuery(
    category2.toString()
  )

  if (!data) return null
  const { product, crumbs } = data
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div className='flex gap-4'>
        <div className='w-64'>filter</div>
        <div className='flex flex-1 flex-col gap-4'>
          {product &&
            product.map((product) => (
              <article
                className='flex gap-4 rounded-md bg-white  p-4 shadow'
                key={product.id}
              >
                {!product.image && (
                  <Image
                    src={product.image[0]}
                    unoptimized
                    priority
                    alt={product.name}
                    width={160}
                    height={160}
                  />
                )}
                <Link
                  href={`/product/${product.id}`}
                  className='flex-1 text-base transition-all hover:text-orange-400'
                >
                  {product.name}
                </Link>
                <div>{product.price}</div>
              </article>
            ))}
        </div>
      </div>
    </>
  )
}

export default Page
