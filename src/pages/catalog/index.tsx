import { type ReactElement } from 'react'
import { Layout } from '~/components/layout'
import { LayoutCatalog } from '~/components/layoutCatalog'
import { api, RouterOutputs } from '~/utils/api'
import { type NextPageWithLayout } from '../_app'
import { CategoryItem } from '../../components/categoryItem'

const Page: NextPageWithLayout = () => {
  const { data } = api.category.getAll.useQuery()
  return (
    <div className='my-4 flex flex-wrap gap-4'>
      {data?.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
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
