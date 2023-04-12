import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { IoCartOutline, IoCloseOutline } from 'react-icons/io5'
import Link from 'next/link'
import { Image } from '~/components/elements/imageWrapper'
import { useAtom } from 'jotai'
import { cartItems } from '~/components/pages/cart/cart.store'
import { cn } from '~/utils/cn'
import { IoMdCheckmark } from 'react-icons/io'
import { useRouter } from 'next/router'

interface RecentOpenedItemProps {
  product: RouterOutputs['product']['getByIds'][number]
  deleteHandler: (id: number) => void
}

export const RecentOpenedItem: FC<RecentOpenedItemProps> = ({
  product,
  deleteHandler,
}) => {
  const [cart, setCart] = useAtom(cartItems)
  const router = useRouter()
  const isInCart = cart.includes(product.id)
  return (
    <div className='block-element relative flex w-48 flex-shrink-0 flex-col justify-between gap-2'>
      <button
        className='absolute self-end rounded-full p-2 hover:bg-neutral-200'
        onClick={() => deleteHandler(product.id)}
      >
        <IoCloseOutline />
      </button>
      <Link
        rel='prefetch'
        className='flex items-center justify-center self-center'
        href={`product/${product.id}`}
      >
        <Image
          height={120}
          className='h-32 w-44'
          src={product.image[0]}
          priority
          width={120}
          alt={product.locale[0]?.name ?? ''}
        />
      </Link>
      <div className='flex flex-col gap-2'>
        <h3 className='truncate text-center'>{product.locale[0]?.name}</h3>
        <div className='flex  items-center justify-between'>
          <span className='text-lg'>{product.price}</span>
          <div
            onClick={() =>
              isInCart
                ? void router.push('/cart')
                : setCart((p) => [...p, product.id])
            }
            className={cn(
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border',
              isInCart
                ? 'border-orange-400 text-orange-400'
                : 'border-neutral-400 text-neutral-700'
            )}
          >
            {isInCart ? <IoMdCheckmark /> : <IoCartOutline size={20} />}
          </div>
        </div>
      </div>
    </div>
  )
}
