import { type RouterOutputs } from '~/utils/api'

export type CategoryType =
  | Exclude<
      RouterOutputs['category']['getCategory']['category'],
      null
    >['subCategories'][number]
