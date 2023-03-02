import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type ReactElement } from 'react'
import { BreadCrumbs } from '~/components/breadCrumbs'
import { Layout } from '~/components/layout'
import { LayoutCatalog } from '~/components/layoutCatalog'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category } = router.query
  if (typeof category !== 'string') {
    return null
  }
  const { data } = api.category.getSubCategories.useQuery(category)
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
              <img className='h-48 w-48' src={image as string} alt='' />
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
