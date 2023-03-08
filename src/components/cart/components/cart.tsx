import { useAtom } from 'jotai'
import { cartItems, cartItemsMount, deleteCartItem } from '../cart.store'
import { CartItem } from './cartItem'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import Link from 'next/link'

export const Cart = () => {
  const [store] = useAtom(cartItems)
  const [storeMounted] = useAtom(cartItemsMount)
  const [, deleteItem] = useAtom(deleteCartItem)

  const onDeleteCartItem = (id: number) => deleteItem(id)
  if (!storeMounted) return <div>loading...</div>
  return (
    <div className='block-element flex flex-col gap-4'>
      {store.length === 0 && (
        <div className='flex flex-col items-center gap-4'>
          <MdOutlineRemoveShoppingCart size={120} />
          <span className='text-xl font-semibold'>Your cart is empty</span>
          <div className='flex gap-4'>
            <Link
              href={'/'}
              className='rounded-md border border-neutral-200 p-2 hover:bg-orange-400 hover:text-white hover:shadow-md'
            >
              go to Home
            </Link>
            <Link
              href={'/catalog'}
              className='rounded-md bg-orange-400  py-2 px-5 font-semibold text-white hover:shadow-md'
            >
              Catalog
            </Link>
          </div>
        </div>
      )}
      {store.map((id) => (
        <CartItem id={id} onDelete={onDeleteCartItem} key={id} />
      ))}
    </div>
  )
}
