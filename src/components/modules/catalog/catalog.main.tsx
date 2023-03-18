import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface MainCatalogProps {
  categories?: RouterOutputs['category']['getAll']['categories']
  setSubCategory: (id: number | null) => void
  subCategory: number | null
}

export const MainCatalog: FC<MainCatalogProps> = ({
  setSubCategory,
  subCategory: subCategory,
  categories,
}) => {
  if (!categories) return null
  return (
    <div className=''>
      {categories?.map((category) => (
        <div
          onMouseEnter={() => setSubCategory(category.id)}
          key={category.id}
          className={subCategory === category.id ? 'text-orange-400' : ''}
        >
          {category.title}
        </div>
      ))}
    </div>
  )
}
