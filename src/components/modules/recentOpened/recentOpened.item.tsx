import Image from 'next/image'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { IoCloseOutline } from 'react-icons/io5'

import img from '~/../public/img.jpg'
import Link from 'next/link'
interface RecentOpenedItemProps {
  product: RouterOutputs['product']['getByIds'][number]
  deleteHandler: (id: number) => void
}

export const RecentOpenedItem: FC<RecentOpenedItemProps> = ({
  product,
  deleteHandler,
}) => {
  return (
    <div className='block-element flex max-w-[250px] flex-col gap-2'>
      <button
        className='absolute self-end rounded-full p-2 hover:bg-neutral-200'
        onClick={() => deleteHandler(product.id)}
      >
        <IoCloseOutline />
      </button>
      <Link
        className='flex items-center justify-center self-center'
        href={`product/${product.id}`}
      >
        <Image
          height={200}
          src={product.image[0] ?? img}
          unoptimized
          alt={product.name}
        />
      </Link>
      <div className='flex flex-col gap-2'>
        <h3 className='text-center'>{product.name}</h3>
        <span>{product.price}</span>
      </div>
    </div>
  )
}
