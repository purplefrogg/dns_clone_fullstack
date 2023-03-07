import Image from 'next/image'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

type CartItemProps = {
  product: RouterOutputs['product']['getByIds'][number]
  onDelete: (id: number) => void
}

export const CartItem: FC<CartItemProps> = ({
  product: { name, price, image, id },
  onDelete,
}) => {
  return (
    <div className='block-element flex justify-between'>
      {image[0] && (
        <Image src={image[0]} alt={name} unoptimized width={120} height={120} />
      )}

      <div>
        {name}
        <button
          onClick={() => onDelete(id)}
          className='rounded-md bg-orange-400 p-2'
        >
          delete
        </button>
      </div>
      <div>
        <span>{price}</span>
      </div>
    </div>
  )
}
