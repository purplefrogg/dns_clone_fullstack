import { api } from '~/utils/api'
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

export default Page
