import { type FC, type InputHTMLAttributes } from 'react'
import { api } from '~/utils/api'

export const CategoryField = ({
  Select,
}: {
  Select: FC<InputHTMLAttributes<HTMLInputElement>>
}) => {
  const { data: categories } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
    },
  })
  return (
    <label className='flex'>
      <span className='w-32'>categoryId</span>
      <Select>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.locale[0]?.title}
          </option>
        ))}
      </Select>
    </label>
  )
}
