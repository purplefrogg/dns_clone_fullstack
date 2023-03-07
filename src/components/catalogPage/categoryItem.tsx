import { type RouterOutputs } from '~/utils/api'
import { CategoryItemWithoutSub } from './categoryItemWithoutSub'
import { CategoryItemWithSub } from './categoryItemWithSub'

type CategoryType =
  | Exclude<
      RouterOutputs['category']['getSubCategories'],
      null
    >['subCategories'][number]
  | RouterOutputs['category']['getAll']['categories'][number]

export const CategoryItem = ({ category }: { category: CategoryType }) => {
  if (category.subCategories.length === 0) {
    return <CategoryItemWithoutSub category={category} />
  }
  return <CategoryItemWithSub category={category} />
}
