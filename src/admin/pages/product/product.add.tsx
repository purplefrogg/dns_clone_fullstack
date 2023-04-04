/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { type InputHTMLAttributes, useState, type FC } from 'react'
import {
  useForm,
  type UseFormSetValue,
  type SubmitHandler,
} from 'react-hook-form'
import { ImageProperty } from '~/admin/shared/imageProperty'
import { InputField } from '~/admin/shared/inputField'
import { api, type RouterInputs } from '~/utils/api'

type Inputs = RouterInputs['admin']['createProduct']
type InputOmit = Omit<Inputs, 'image' | 'categoryId' | 'ProductProperty'>
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
  const categoryId = watch('categoryId', categories?.[0]?.id)
  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {inputs.map((input) => (
          <InputField {...input} key={input.title} />
        ))}

        <ImageProperty setImage={(img: string) => setValue('image', img)} />

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
        {isSubmitSuccessful && (
          <span className='text-green-400'>success {submitCount}</span>
        )}

        <button type='submit'>submit</button>
      </form>
      {!!categoryId && (
        <ProductProperties setValue={setValue} categoryId={categoryId} />
      )}
      <PropertyAdd categoryId={categoryId} />
    </div>
  )
}

const ProductProperties: FC<{
  categoryId: number
  setValue: UseFormSetValue<Inputs>
}> = ({ categoryId, setValue }) => {
  const { data } = api.admin.getProductProperties.useQuery(categoryId)
  if (!data) return <div>loading</div>
  return (
    <div>
      properties
      {data.map((property) => {
        return (
          <div className='gap4 flex' key={property.id}>
            <span className='w-36'>{property.title.locale[0]?.title}</span>
            <div>
              {property.field.map((item) => (
                <div className='flex gap-2' key={item.id}>
                  {item.about.locale[0]?.title}
                  <input
                    type='text'
                    onChange={(e) => {
                      const value = e.currentTarget.value

                      setValue(`ProductProperty.${item.id}.value`, value)
                      setValue(`ProductProperty.${item.id}.fieldId`, item.id)
                    }}
                    list={item.about.slug}
                  />
                  <select
                    onChange={(e) => {
                      setValue(`ProductProperty.${item.id}.fieldId`, item.id)

                      setValue(
                        `ProductProperty.${item.id}.valueId`,
                        +e.currentTarget.value
                      )
                    }}
                    id={item.about.slug}
                  >
                    <option>not select</option>
                    {item.FieldValue.map(({ id, value }) => (
                      <option key={id} value={id}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <FieldAdd propertyId={property.id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

type PropertyAddInputs = RouterInputs['admin']['createProperty']
const PropertyAdd: FC<{ categoryId: number }> = ({ categoryId }) => {
  const [adding, setAdding] = useState(false)

  const utils = api.useContext()
  const { mutate } = api.admin.createProperty.useMutation({
    onSuccess: () => {
      void utils.admin.getProductProperties.invalidate()
    },
  })
  const { register, handleSubmit } = useForm<PropertyAddInputs>()
  const onSubmit: SubmitHandler<PropertyAddInputs> = (data) => {
    mutate({ ...data, categoryId })
    setAdding(false)
  }
  return (
    <div>
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property</h1>}
      {adding && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='border border-gray-300'
            type='text'
            {...register('titleEn')}
          />
          <input
            className='border border-gray-300'
            type='text'
            {...register('titleRu')}
          />
          <button type='submit'>add</button>
        </form>
      )}
    </div>
  )
}

type AddFieldInputs = Omit<
  RouterInputs['admin']['createPropertyField'],
  'propertyId'
>
const FieldAdd: FC<{ propertyId: number }> = ({ propertyId }) => {
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
      title: 'value',
      error: errors.value,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('value', {
            required: 'value is required',
          })}
        />
      ),
    },
    {
      title: 'value',
      error: errors.value,
      type: 'text',
      Input: (props: InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...props}
          {...register('value', {
            required: 'value is required',
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
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property</h1>}
      {adding && (
        <form onSubmit={handleSubmit(addField)}>
          {inputs.map((input) => (
            <InputField key={input.title} {...input} />
          ))}
          <button type='submit'>add</button>
        </form>
      )}
    </div>
  )
}
