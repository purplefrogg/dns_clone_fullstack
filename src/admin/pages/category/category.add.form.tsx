import { type FC } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { ImageProperty } from '~/admin/shared/imageProperty'
import { api, type RouterInputs } from '~/utils/api'
const without_parent = 'without_parent'
interface SignInFormProps {
  setShow: (show: boolean) => void
}
type Inputs = RouterInputs['admin']['createCategory']
export const CategoryForm: FC<SignInFormProps> = ({ setShow }) => {
  const utils = api.useContext()

  const { mutate, error } = api.admin.createCategory.useMutation({
    onSuccess: () => {
      setShow(false)
      void utils.admin.getCategories.invalidate()
    },
  })
  const { data: categories } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
      reverse: true,
    },
  })

  const { register, setValue, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setShow(false)
      }}
      className='absolute top-0 right-0 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-50'
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='text-2xl font-bold'>create Category</div>
        <label className='flex justify-between  gap-2'>
          Title
          <input
            type='text'
            {...register('title', { required: 'title is required' })}
          />
        </label>
        <ImageProperty setImage={(img: string) => setValue('image', img)} />
        <label className='flex justify-between  gap-2'>
          parentId
          <select
            {...register('parentId', {
              setValueAs: (value) =>
                value === without_parent ? undefined : +value,
            })}
          >
            <option value={without_parent}>without Parent</option>
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <label className='flex justify-between  gap-2'>
          slug
          <input
            type='text'
            {...register('slug', {
              setValueAs: (value: string) => (value === '' ? undefined : value),
            })}
          />
        </label>
        {error && <div className='text-red-500'>{error.message}</div>}
        <button type='submit'>continue</button>
      </form>
    </div>
  )
}
