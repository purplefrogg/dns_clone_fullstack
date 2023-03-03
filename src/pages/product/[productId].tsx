import { useRouter } from 'next/router'
import { type ReactElement } from 'react'
import { Layout } from '~/components/layout'
import { LayoutCatalog } from '~/components/layoutCatalog'
import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { productId } = router.query

  if (typeof productId !== 'string') {
    void router.push('/404')
    return null
  }
  const { data } = api.product.getById.useQuery(parseInt(productId))
  return <div>{data?.name}</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutCatalog>{page}</LayoutCatalog>
    </Layout>
  )
}
export default Page
