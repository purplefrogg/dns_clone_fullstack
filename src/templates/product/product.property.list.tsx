import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { ProductPropertyItem } from './product.property.item'

interface Props {
  properties: RouterOutputs['product']['getById']['product']['ProductProperty']
}

export const ProductPropertyList: FC<Props> = ({ properties }) => {
  return (
    <div className='flex flex-col gap-4'>
      {properties.map((property) => (
        <ProductPropertyItem property={property} key={property.id} />
      ))}
    </div>
  )
}
