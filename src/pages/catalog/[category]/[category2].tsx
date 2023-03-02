import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Layout } from '~/components/layout'
import { LayoutCatalog } from '~/components/layoutCatalog'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  return <p> s</p>
}
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutCatalog>{page}</LayoutCatalog>
    </Layout>
  )
}
export default Page
