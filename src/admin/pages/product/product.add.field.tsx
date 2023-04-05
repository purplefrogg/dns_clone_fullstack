/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC, useState, type InputHTMLAttributes } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { InputField } from '~/admin/shared/inputField'
import { type RouterInputs, api } from '~/utils/api'

type AddFieldInputs = Omit<
  RouterInputs['admin']['createPropertyField'],
  'propertyId'
>
export const FieldAdd: FC<{ propertyId: number }> = ({ propertyId }) => {
  const [adding, setAdding] = useState(false)

  const utils = api.useContext()
  const { mutate } = api.admin.createPropertyField.useMutation({
    onSuccess: () => {
      void utils.admin.getProductProperties.invalidate()
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFieldInputs>()
  const addField: SubmitHandler<AddFieldInputs> = (data) => {
    mutate({ propertyId, ...data })

    setAdding(false)
  }
  const inputs = [
    {
      title: 'titleEn',
      error: errors.title,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('title', {
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
            required: 'titleRu is required',
          })}
        />
      ),
    },

    {
      title: 'description',
      errors: errors.description,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('description', {
            required: 'description is required',
          })}
        />
      ),
    },
    {
      title: 'descriptionRu',
      errors: errors.description,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('descriptionRu', {
            required: 'description is required',
          })}
        />
      ),
    },
    {
      title: 'slug',
      error: errors.slug,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('slug', {
            required: 'slug is required',
          })}
        />
      ),
    },
  ]
  return (
    <div>
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property Field</h1>}
      {adding && (
        <form onSubmit={handleSubmit(addField)}>
          {inputs.map((input) => (
            <InputField key={input.title} {...input} />
          ))}
          <button type='submit'>add</button>
          <button onClick={() => setAdding(false)} type='reset'>
            cancel
          </button>
        </form>
      )}
    </div>
  )
}
