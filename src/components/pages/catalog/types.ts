import { type RouterOutputs } from '~/utils/api'

export type CategoryType =
  | Exclude<
      RouterOutputs['category']['getAll']['categories'][number],
      null
    >['subCategories'][number]
