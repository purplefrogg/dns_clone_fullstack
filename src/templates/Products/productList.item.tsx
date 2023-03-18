import { Product } from '@prisma/client'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { cartItems } from '~/templates/cart/cart.store'

interface ProductItemProps {
  product: Product
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const [cart, setCart] = useAtom(cartItems)
  const router = useRouter()
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
      <div className='flex flex-col'>
        {product.price}
        <button
          className='rounded-md bg-orange-400 px-2 py-1 text-white'
          onClick={() => {
            if (cart.includes(product.id)) {
              void router.push('/cart')
            } else setCart((prev) => [...prev, product.id])
          }}
        >
          {cart.includes(product.id) ? 'go to Cart' : 'buy'}
        </button>
      </div>
    </article>
  )
}
