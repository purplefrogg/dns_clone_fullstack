/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC, useState, type InputHTMLAttributes } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { InputField } from '~/admin/shared/inputField'
import { type RouterInputs, api } from '~/utils/api'

type PropertyAddInputs = RouterInputs['admin']['createProperty']
export const PropertyAdd: FC<{ categoryId: number }> = ({ categoryId }) => {
  const [adding, setAdding] = useState(false)

  const utils = api.useContext()
  const { mutate } = api.admin.createProperty.useMutation({
    onSuccess: () => {
      void utils.admin.getProductProperties.invalidate()
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyAddInputs>()
  const onSubmit: SubmitHandler<PropertyAddInputs> = (data) => {
    mutate({ ...data, categoryId })
    setAdding(false)
  }
  const inputs = [
    {
      title: 'titleEn',
      error: errors.titleEn,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('titleEn', {
            required: 'title is required',
          })}
        />
      ),
    },
    {
      title: 'titleRu',
      error: errors.titleRu,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('titleRu', {
            required: 'title is required',
          })}
        />
      ),
    },
  ]
  return (
    <div>
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property</h1>}
      {adding && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input) => (
            <InputField {...input} key={input.title} />
          ))}

          <button type='submit'>add</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </form>
      )}
    </div>
  )
}
