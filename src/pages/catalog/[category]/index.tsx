import { useRouter } from 'next/router'
import { BreadCrumbs } from '~/components/breadCrumbs'
import { CategoryItem } from '~/components/categoryItem'
import { type NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category } = router.query
  if (typeof category !== 'string') {
    return null
  }
  const { data } = api.category.getSubCategories.useQuery(category)
  if (!data || !data.categories) {
    return <div>not found</div>
  }
  const { categories, crumbs } = data
  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs crumbs={crumbs} />
      <h1 className='text-3xl font-semibold'>{categories.title}</h1>
      <div className='flex flex-wrap gap-4'>
        {categories.subCategories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}

export default Page
