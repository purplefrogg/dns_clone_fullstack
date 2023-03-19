import { CategoryAdd } from './category.add'
import { CategorySearch } from './category.search'
import { CategoryList } from './categoryList'

export const CategoryRoot = () => {
  return (
    <div className='block-element '>
      <CategorySearch />
      <CategoryList />
      <CategoryAdd />
    </div>
  )
}
