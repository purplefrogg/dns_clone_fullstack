import Image from 'next/image'
import { type FC } from 'react'
import { api } from '~/utils/api'

type CartItemProps = {
  id: number
  onDelete: (id: number) => void
  onError: (id: number) => void
}

export const CartItem: FC<CartItemProps> = ({ id, onDelete, onError }) => {
  const { data, error } = api.product.getById.useQuery(id)
  if (error) {
    onError(id)
  }
  if (!data)
    return (
      <div className='block-element flex justify-between gap-4'>
        <div className='flex'>
          <div className='h-32 w-32 bg-neutral-300'></div>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div className='h-4 w-full rounded-md bg-neutral-300 '></div>
          <button className='self-end rounded-md bg-orange-400 p-2'>
            delete
          </button>
        </div>
        <div className='h-4 w-16 rounded-md bg-neutral-300 '></div>
        <div className='flex'></div>
      </div>
    )

  const { name, price, image } = data

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
