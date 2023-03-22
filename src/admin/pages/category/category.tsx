import { CategoryAdd } from './category.add'
import { CategorySearch } from './category.search'
import { CategoryList } from './categoryList'

export const CategoryRoot = () => {
  return (
    <>
      <CategorySearch />
      <CategoryList />
      <CategoryAdd />
    </>
  )
}
