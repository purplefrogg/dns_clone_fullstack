import { useAtom } from 'jotai'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { Image } from '~/components/elements/imageWrapper'
import { useTranslate } from '~/components/hooks/useTrans'
import { cartItems } from '~/components/pages/cart/cart.store'
import { type RouterOutputs } from '~/utils/api'

interface ProductItemProps {
  product: RouterOutputs['category']['getProducts']['products'][number]
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const [cart, setCart] = useAtom(cartItems)
  const router = useRouter()
  const text = useTranslate({
    nameSpace: 'catalog',
    keys: ['goToCart', 'buy'],
  })
  return (
    <article
      className='flex gap-4 rounded-md bg-white  p-4 shadow'
      key={product.id}
    >
      <Image
        src={product.image[0]}
        className='h-32 w-32'
        priority
        alt={product.locale[0]?.name ?? ''}
        width={160}
        height={160}
      />
      <Link
        href={`/product/${product.id}`}
        className='flex-1 text-base transition-all hover:text-orange-400'
      >
        {product.locale[0]?.name}
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
          {cart.includes(product.id) ? text.goToCart : text.buy}
        </button>
      </div>
    </article>
  )
}
