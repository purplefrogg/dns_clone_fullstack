import { useRouter } from 'next/router'
import { CategoryItem } from '~/components/categoryItem'
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
        {data?.subCategories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}

export default Page
