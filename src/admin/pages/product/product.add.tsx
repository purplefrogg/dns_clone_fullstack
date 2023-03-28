/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */

import { useState, type FC } from 'react'
import {
  useForm,
  type UseFormSetValue,
  type SubmitHandler,
} from 'react-hook-form'
import { ImageProperty } from '~/admin/shared/imageProperty'
import { InputField } from '~/admin/shared/inputField'
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
    data.ProductProperty = data.ProductProperty.filter((item) => !!item)

    mutate(data)
  }

  const categoryId = watch('categoryId', categories?.[0]?.id)
  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <InputField
          title='name'
          error={errors.name}
          type='text'
          Input={(props) => (
            <input
              {...props}
              {...register('name', {
                required: 'name is required',
              })}
            />
          )}
        />
        <InputField
          type='text'
          Input={(props) => (
            <input
              {...props}
              {...register('description', {
                required: 'description is required',
              })}
            />
          )}
          title='description'
          error={errors.description}
        />
        <ImageProperty setImage={(img: string) => setValue('image', img)} />

        <InputField
          type={'number'}
          error={errors.price}
          Input={(props) => (
            <input
              {...props}
              {...register('price', {
                valueAsNumber: true,
                required: 'price is required',
              })}
            />
          )}
          title='Price'
        />
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
      {data.map((property, index) => {
        return (
          <div className='gap4 flex' key={property.id}>
            <span className='w-36'>{property.title.title}</span>
            <div>
              {property.field.map((item) => (
                <div className='flex gap-2' key={item.id}>
                  {item.about.title}
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
const PropertyAdd: FC<{ categoryId: number }> = ({ categoryId }) => {
  const [adding, setAdding] = useState(false)
  const [text, setText] = useState('')
  const utils = api.useContext()
  const { mutate } = api.admin.createProperty.useMutation({
    onSuccess: () => {
      void utils.admin.getProductProperties.invalidate()
    },
  })
  const addProperty = () => {
    mutate({ title: text, categoryId })
    setText('')
    setAdding(false)
  }
  return (
    <div>
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property</h1>}
      {adding && (
        <div>
          <input
            className='border border-gray-300'
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            type='text'
          />
          <button onClick={addProperty}>add</button>
        </div>
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
  return (
    <div>
      {!adding && <h1 onClick={() => setAdding(true)}>Add Property</h1>}
      {adding && (
        <form onSubmit={handleSubmit(addField)}>
          <InputField
            title='title'
            error={errors.title}
            type='text'
            Input={(props) => (
              <input
                {...props}
                {...register('title', {
                  required: 'title is required',
                })}
              />
            )}
          />
          <InputField
            title='value'
            error={errors.value}
            type='text'
            Input={(props) => (
              <input
                {...props}
                {...register('value', {
                  required: 'value is required',
                })}
              />
            )}
          />
          <InputField
            title='description'
            error={errors.value}
            type='text'
            Input={(props) => (
              <input
                {...props}
                {...register('description', {
                  required: 'description is required',
                })}
              />
            )}
          />
          <InputField
            title='slug'
            error={errors.value}
            type='text'
            Input={(props) => (
              <input
                {...props}
                {...register('slug', {
                  required: 'slug is required',
                })}
              />
            )}
          />
          <button type='submit'>add</button>
        </form>
      )}
    </div>
  )
}
