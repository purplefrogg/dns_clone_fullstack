import { type FC } from 'react'
import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { api } from '~/utils/api'
import { CategoryItems } from './category.items'

interface Props {
  categorySlug: string
}

export const Catalog_lvl_2: FC<Props> = ({ categorySlug }) => {
  const { data } = api.category.getCategory.useQuery(categorySlug)
  if (!data) return <div>loading</div>
  const { category, crumbs } = data
  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs crumbs={crumbs} />
      {data && (
        <>
          <h1 className='text-3xl font-semibold'>{category?.title}</h1>
          <CategoryItems categories={data.category?.subCategories} />
        </>
      )}
    </div>
  )
}
