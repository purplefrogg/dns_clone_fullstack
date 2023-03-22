import { type FC } from 'react'
import { CategoryItem } from './categoryItem'
import { type CategoryType } from './types'

interface Props {
  categories: CategoryType[]
}

export const CategoryItems: FC<Props> = ({ categories }) => {
  if (categories.length === 0) {
    return null
  }
  return (
    <div className='flex gap-4'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
