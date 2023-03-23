import { type FC } from 'react'
import { api } from '~/utils/api'

interface SignInFormProps {
  setShow: (show: boolean) => void
}

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
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setShow(false)
      }}
      className='absolute top-0 right-0 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-50'
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const inputs = Object.fromEntries(formData)
          if (!inputs.title) return null

          if (!inputs.parentId) {
            return mutate({
              title: inputs.title as string,
              slug: inputs.slug as string,
            })
          }
          mutate({
            title: inputs.title as string,
            slug: inputs.slug as string,
            parentId: inputs.parentId ? +inputs.parentId : undefined,
          })
        }}
        className='flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='text-2xl font-bold'>create Category</div>
        <label className='flex justify-between  gap-2'>
          Title
          <input type='text' name='title' required />
        </label>
        <label className='flex justify-between  gap-2'>
          parentId
          <select name='parentId'>
            <option value=''>without Parent</option>
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <label className='flex justify-between  gap-2'>
          slug
          <input type='text' name='slug' />
        </label>
        {error && <div className='text-red-500'>{error.message}</div>}
        <button type='submit'>continue</button>
      </form>
    </div>
  )
}
