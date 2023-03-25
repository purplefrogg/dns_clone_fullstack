import { useAtom } from 'jotai'
import Image from 'next/image'
import { useEffect, type FC } from 'react'
import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { recentOpenedItems } from '~/components/modules/recentOpened/recentOpened.store'
import { api } from '~/utils/api'
import { cn } from '~/utils/cn'
import { cartItems } from '../cart/cart.store'
import { ProductPropertyList } from './product.property.list'

export const Product: FC<{ id: number }> = ({ id }) => {
  const [recentOpened, setRecentOpened] = useAtom(recentOpenedItems)
  const { data, isError } = api.product.getById.useQuery(id)

  useEffect(() => {
    if (data && !recentOpened.includes(data.product.id)) {
      setRecentOpened([...recentOpened, data.product.id])
    }
  }, [data, recentOpened, setRecentOpened])
  if (isError) {
    return <div>error</div>
  }

  if (!data) {
    return <div>loading...</div>
  }

  const { product, crumbs } = data
  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs crumbs={crumbs} />
      <h1 className='text-2xl font-semibold'>{product.name}</h1>
      <div className='block-element flex gap-2'>
        <Image
          src={
            product.image[0]
              ? `${process.env.NEXT_PUBLIC_STATIC_URL}/${product.image[0]}`
              : '/image_placeholder.jpg'
          }
          width={500}
          height={500}
          alt={`${product.name} image`}
        />
        <div className='flex-1'>
          {product.name}
          <ProductBuy id={product.id} price={product.price} />
        </div>
      </div>
      <div className='block-element flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold '>Features {product.name}</h2>
        <ProductPropertyList properties={product.ProductProperty} />
      </div>

      <div className='block-element flex flex-col gap-4'>
        <h2 className='text-lg font-semibold'>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  )
}

const ProductBuy: FC<{ price: number; id: number }> = ({ price, id }) => {
  const [cart, setCart] = useAtom(cartItems)
  const isInCart = cart.includes(id)
  const addToCart = () => {
    if (isInCart) {
      setCart(cart.filter((item) => item !== id))
    } else {
      setCart([...cart, id])
    }
  }
  return (
    <div className='block-element flex w-full items-center justify-between gap-2'>
      <span className='text-2xl font-semibold'>{price}</span>
      <button
        className={cn(
          'rounded border px-6 py-2 text-orange-400',
          isInCart ? 'border-orange-400' : 'bg-orange-400 text-white'
        )}
        onClick={addToCart}
      >
        {isInCart ? 'remove from cart' : 'add to cart'}
      </button>
    </div>
  )
}
