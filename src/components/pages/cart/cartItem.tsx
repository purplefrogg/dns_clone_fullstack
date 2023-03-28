import { useState, type FC } from 'react'
import { Image } from '~/components/elements/imageWrapper'
import { api } from '~/utils/api'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useTranslate } from '~/components/hooks/useTrans'
type CartItemProps = {
  id: number
  onDelete: (id: number) => void
  onError: (id: number) => void
}

export const CartItem: FC<CartItemProps> = ({ id, onDelete, onError }) => {
  const { data, error } = api.product.getById.useQuery(id)
  const text = useTranslate({
    nameSpace: 'cart',
    keys: ['delete'],
  })
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
            {text.delete}
          </button>
        </div>
        <div className='h-4 w-16 rounded-md bg-neutral-300 '></div>
        <div className='flex'></div>
      </div>
    )

  const {
    product: { name, image, price },
  } = data

  return (
    <div className='block-element flex justify-between gap-2'>
      {image[0] && (
        <Image
          src={image[0]}
          alt={name}
          priority
          className='h-48 w-48 object-contain'
          width={120}
          height={120}
        />
      )}

      <div className='flex flex-1 flex-col'>
        {name}
        <button
          onClick={() => onDelete(id)}
          className='w-fit rounded-md bg-orange-400 p-2'
        >
          {text.delete}
        </button>
      </div>
      <CartPrice price={price} />
    </div>
  )
}

const CartPrice = ({ price }: { price: number }) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <>
      <div className='flex h-fit items-center justify-center gap-2 rounded-lg border border-neutral-300 p-2 text-neutral-700'>
        <AiOutlineMinus
          size={20}
          onClick={() => setQuantity((p) => (p <= 1 ? p : p - 1))}
        />
        <span className='text-lg'>{quantity}</span>
        <AiOutlinePlus size={20} onClick={() => setQuantity((p) => p + 1)} />
      </div>
      <div className='w-20 text-center'>
        <span>{price * quantity}</span>
      </div>
    </>
  )
}
