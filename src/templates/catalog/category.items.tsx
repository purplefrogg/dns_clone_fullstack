import { type FC } from 'react'
import { CategoryItem } from './categoryItem'
import { type CategoryType } from './types'

interface Props {
  categories: CategoryType[]
}

export const CategoryItems: FC<Props> = ({ categories: category }) => {
  if (category.length === 0) {
    return null
  }
  return (
    <div className='flex gap-4'>
      {category.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
