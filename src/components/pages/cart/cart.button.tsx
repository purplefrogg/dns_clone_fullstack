import { useAtom } from 'jotai'
import { NavItem } from '~/components/elements/header.navItem'
import { cartItems } from './cart.store'
import { BsCart3 } from 'react-icons/bs'

export const CartButton = () => {
  const [cart] = useAtom(cartItems)

  return (
    <>
      <NavItem className='relative' icon={BsCart3} href='/cart'>
        {cart.length !== 0 && (
          <span
            className='absolute -top-2 right-2 flex w-6
        items-center justify-center overflow-hidden rounded-full bg-orange-400
        font-bold text-white'
          >
            {cart.length}
          </span>
        )}
        Cart
      </NavItem>
    </>
  )
}
