import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface ProductItemProps {
  product: RouterOutputs['product']['getByCategory']['product'][number]
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <article
      className='flex gap-4 rounded-md bg-white  p-4 shadow'
      key={product.id}
    >
      {!product.image && (
        <Image
          src={product.image[0]}
          unoptimized
          priority
          alt={product.name}
          width={160}
          height={160}
        />
      )}
      <Link
        href={`/product/${product.id}`}
        className='flex-1 text-base transition-all hover:text-orange-400'
      >
        {product.name}
      </Link>
      <div>{product.price}</div>
    </article>
  )
}
