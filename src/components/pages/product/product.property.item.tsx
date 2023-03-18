import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface Props {
  property: RouterOutputs['product']['getById']['product']['ProductProperty'][number]
}

export const ProductPropertyItem: FC<Props> = ({ property }) => (
  <div>
    <div className='' key={property.id}>
      <h3 className='text-lg font-semibold'>{property.title?.title}</h3>
      {property.PropertyField.map((field) => (
        <div className='flex gap-4' key={field.id}>
          <div className='w-64 border-b-2 border-dotted '>
            {field.about?.title}
          </div>
          <span>{field.value.value}</span>
        </div>
      ))}
    </div>
  </div>
)
