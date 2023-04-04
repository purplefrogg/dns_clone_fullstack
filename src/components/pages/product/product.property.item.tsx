import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface Props {
  property: RouterOutputs['product']['getById']['properties'][number]
}

export const ProductPropertyItem: FC<Props> = ({ property }) => (
  <div>
    <div className='' key={property.id}>
      <h3 className='text-lg font-semibold'>
        {property.title.locale[0]?.title}
      </h3>
      {property.field.map((field) => (
        <div className='flex gap-4' key={field.id}>
          <div className='w-64 border-b-2 border-dotted '>
            {field.about.locale[0]?.title}
          </div>
          <span>{field.FieldValue[0]?.value}</span>
        </div>
      ))}
    </div>
  </div>
)
