import { type UseFormRegister } from 'react-hook-form'
import { api, type RouterInputs } from '~/utils/api'
type Inputs = RouterInputs['admin']['createProduct']

export const CategoryField = ({
  register,
}: {
  register: UseFormRegister<Inputs>
}) => {
  const { data: categories } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
    },
  })
  return (
    <label className='flex'>
      <span className='w-32'>categoryId</span>
      <select
        {...register('categoryId', {
          valueAsNumber: true,
          required: 'category is required',
        })}
      >
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.locale[0]?.title}
          </option>
        ))}
      </select>
    </label>
  )
}
