/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { type InputHTMLAttributes, type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ImageProperty } from '~/admin/shared/imageProperty'
import { InputField } from '~/admin/shared/inputField'
import { api, type RouterInputs } from '~/utils/api'
import { CategoryField } from './product.add.category'
import { ProductProperties } from './product.add.properties'
import { PropertyAdd } from './product.add.property'

type Inputs = RouterInputs['admin']['createProduct']
type InputOmit = Omit<Inputs, 'image' | 'categoryId' | 'ProductProperty'>
export const ProductAdd: FC = () => {
  const utils = api.useContext()

  const { mutate } = api.admin.createProduct.useMutation({
    onSuccess: () => {
      void utils.admin.getProductList.invalidate()
    },
  })
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful, submitCount },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.ProductProperty) {
      data.ProductProperty = data.ProductProperty.filter((item) => !!item)
    } else {
      data.ProductProperty = []
    }
    mutate(data)
  }
  const inputs: ({
    title: keyof InputOmit
    Input: (props: InputHTMLAttributes<HTMLInputElement>) => JSX.Element
  } & Record<string, unknown>)[] = [
    {
      title: 'name',
      error: errors.name,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('name', {
            required: 'name is required',
          })}
        />
      ),
    },
    {
      title: 'nameRu',
      error: errors.name,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('nameRu', {
            required: 'name is required',
          })}
        />
      ),
    },
    {
      title: 'description',
      error: errors.description,
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
      error: errors.description,
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
      title: 'price',
      error: errors.price,
      type: 'number',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('price', {
            valueAsNumber: true,
            required: 'price is required',
          })}
        />
      ),
    },
  ]
  const categoryId = watch('categoryId')

  return (
    <div>
      <h1>Add Product</h1>
      <form className='flex flex-col gap-2'>
        {inputs.map((input) => (
          <InputField {...input} key={input.title} />
        ))}

        <ImageProperty setImage={(img: string) => setValue('image', img)} />
      </form>
      <CategoryField register={register} />
      {!!categoryId && (
        <ProductProperties setValue={setValue} categoryId={categoryId} />
      )}
      <PropertyAdd categoryId={categoryId} />
      {isSubmitSuccessful && (
        <span className='text-green-400'>successful created {submitCount}</span>
      )}
      <button
        className='rounded bg-green-400 p-2  text-white'
        onClick={handleSubmit(onSubmit)}
      >
        create
      </button>
    </div>
  )
}
