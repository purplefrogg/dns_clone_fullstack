import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../_app'
import { CategoryItem } from '../../components/categoryItem'
import { BreadCrumbs } from '~/components/breadCrumbs'

const Page: NextPageWithLayout = () => {
  const { data } = api.category.getAll.useQuery()
  if (!data) {
    return <div>loading</div>
  }
  const { categories } = data
  const crumbs = [{ text: 'Catalog', to: '/catalog' }]
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />

      <div className='my-4 flex flex-wrap gap-4'>
        {categories?.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </>
  )
}

export default Page
