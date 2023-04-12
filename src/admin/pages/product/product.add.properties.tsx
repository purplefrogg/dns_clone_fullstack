import { type FC } from 'react'
import { type UseFormSetValue } from 'react-hook-form'
import { api, type RouterInputs } from '~/utils/api'
import { FieldAdd } from './product.add.field'

type Inputs = RouterInputs['admin']['createProduct']
export const ProductProperties: FC<{
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
                    className='  border '
                    type='text'
                    onChange={(e) => {
                      const value = e.currentTarget.value
                      setValue(`ProductProperty.${item.id}.value`, value)
                      setValue(`ProductProperty.${item.id}.fieldId`, item.id)
                    }}
                    list={item.about.slug}
                  />
                  <select
                    onChange={() => {
                      setValue(`ProductProperty.${item.id}.fieldId`, item.id)
                    }}
                    id={item.about.slug}
                  >
                    <option>not select</option>
                    {item.FieldValue.map(({ value }) => (
                      <option key={value} value={value}>
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
