import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, type FC } from 'react'
import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { Image } from '~/components/elements/imageWrapper'
import { useTranslate } from '~/components/hooks/useTrans'
import { recentOpenedItems } from '~/components/modules/recentOpened/recentOpened.store'
import { api } from '~/utils/api'
import { cn } from '~/utils/cn'
import { cartItems } from '../cart/cart.store'
import { ProductPropertyList } from './product.property.list'

export const Product: FC<{ id: number }> = ({ id }) => {
  const [recentOpened, setRecentOpened] = useAtom(recentOpenedItems)
  const router = useRouter()

  const { data, isError } = api.product.getById.useQuery({
    id,
    lang: router.locale as 'en' | 'ru',
  })
  const text = useTranslate({
    nameSpace: 'product',
    keys: ['features', 'description'],
  })
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

  const { product, crumbs, properties } = data
  return (
    <div className='flex flex-col gap-4'>
      <Head>
        <title>{product.locale[0]?.name}</title>
        <meta name='description' content={product.locale[0]?.name} />
      </Head>
      <BreadCrumbs crumbs={crumbs} />
      <h1 className='text-2xl font-semibold'>{product.locale[0]?.name}</h1>
      <div className='block-element flex flex-col gap-2 md:flex-row'>
        <Image
          width={500}
          height={500}
          className='h-96 w-[500px] object-cover'
          alt={product.locale[0]?.name ?? '' + ' image'}
          src={product.image[0]}
        />
        <div className='flex-1'>
          {product.locale[0]?.name}
          <ProductBuy id={product.id} price={product.price} />
        </div>
      </div>
      <div className='block-element flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold '>
          {text.features} {product.locale[0]?.name}
        </h2>
        <ProductPropertyList properties={properties} />
      </div>

      <div className='block-element flex flex-col gap-4'>
        <h2 className='text-lg font-semibold'>{text.description}</h2>
        <p>{product.locale[0]?.description}</p>
      </div>
    </div>
  )
}

const ProductBuy: FC<{ price: number; id: number }> = ({ price, id }) => {
  const [cart, setCart] = useAtom(cartItems)
  const isInCart = cart.includes(id)
  const text = useTranslate({
    nameSpace: 'product',
    keys: ['addToCart', 'removeFromCart'],
  })
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
        {isInCart ? text.removeFromCart : text.addToCart}
      </button>
    </div>
  )
}
