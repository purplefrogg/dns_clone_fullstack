import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type ReactElement } from 'react'
import { Layout } from '~/components/layout'
import { LayoutCatalog } from '~/components/layoutCatalog'
import { type NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category } = router.query
  if (typeof category !== 'string') {
    return null
  }
  const { data, isSuccess } = api.category.getSubCategories.useQuery(category)

  if (!data && isSuccess) {
    return <div>not found</div>
  }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-semibold'>{data?.title}</h1>
      <div className='flex flex-wrap gap-4'>
        {data?.subCategories.map(({ id, image, title, slug }) => (
          <Link
            passHref
            href={`${data.slug}/${slug}`}
            className='flex h-64 w-64 flex-col items-center rounded-md bg-white p-4 text-center shadow hover:shadow-xl'
            key={id}
          >
            {image && (
              <Image
                className='h-48 w-48'
                width={192}
                height={192}
                unoptimized
                src={image}
                alt=''
              />
            )}

            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutCatalog>{page}</LayoutCatalog>
    </Layout>
  )
}
export default Page
