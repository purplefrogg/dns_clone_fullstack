/* eslint-disable @next/next/no-img-element */
import { type FC } from 'react'
import {
  useForm,
  type UseFormSetValue,
  type SubmitHandler,
} from 'react-hook-form'
import { ImageProperty } from '~/admin/shared/imageProperty'
import { api, type RouterInputs } from '~/utils/api'

type Inputs = RouterInputs['admin']['createProduct']

export const ProductAdd: FC = () => {
  const utils = api.useContext()
  const { data: categories } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
    },
  })
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
  if (!categories) return <div>loading</div>
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data)
    //
    mutate(data)
  }

  const categoryId = watch('categoryId', categories?.[0]?.id)
  return (
    <div>
      <h1>Add Product</h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <label className='flex  '>
          <span className='w-32'>name</span>
          <input
            type='text'
            {...register('name', {
              required: 'name is required',
            })}
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </label>
        <label className='flex'>
          <span className='w-32'>description</span>
          <input
            type='text'
            {...register('description', {
              required: 'description is required',
            })}
          />
          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}
        </label>
        <ImageProperty setImage={(img: string) => setValue('image', img)} />
        <label className='flex'>
          <span className='w-32'>price</span>
          <input
            type='number'
            {...register('price', {
              valueAsNumber: true,
              required: 'price is required',
            })}
          />
          {errors.price && (
            <span className='text-red-500'>{errors.price.message}</span>
          )}
        </label>
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
                {category.title}
              </option>
            ))}
          </select>
        </label>
        {!!categoryId && (
          <ProductProperties setValue={setValue} categoryId={categoryId} />
        )}
        {isSubmitSuccessful && (
          <span className='text-green-400'>success {submitCount}</span>
        )}
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

const ProductProperties: FC<{
  categoryId: number
  setValue: UseFormSetValue<Inputs>
}> = ({ categoryId, setValue }) => {
  const { data: properties } =
    api.admin.getProductProperties.useQuery(categoryId)
  if (!properties) return <div>loading</div>
  return (
    <div>
      properties
      {properties.map((tittle, propertyIndex) => (
        <div key={tittle.id}>
          <label className='flex'>
            <span className='w-32 font-semibold'>{tittle.title}</span>
            {tittle.fields.map((field, fieldIndex) => (
              <div key={field.id}>
                {field.title}
                <select
                  onChange={(e) => {
                    setValue(
                      `ProductProperty.${propertyIndex}.titleId`,
                      tittle.id
                    )
                    setValue(
                      `ProductProperty.${propertyIndex}.fields.${fieldIndex}.aboutId`,
                      field.id
                    )
                    setValue(
                      `ProductProperty.${propertyIndex}.fields.${fieldIndex}.value`,
                      +e.currentTarget.value
                    )
                  }}
                >
                  <option value=''>not selected</option>
                  {field.values.map((value) => (
                    <option key={value.id} value={value.id}>
                      {value.value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </label>
        </div>
      ))}
    </div>
  )
}
