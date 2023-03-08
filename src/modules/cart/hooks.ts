import { useAtom } from 'jotai'
import { cartItems, cartItemsMount, deleteCartItem } from './cart.store'

export const useCartItems = () => {
  const [store] = useAtom(cartItems)
  const [storeMounted] = useAtom(cartItemsMount)
  const [, deleteItem] = useAtom(deleteCartItem)

  return {
    store,
    storeMounted,
    deleteItem,
  }
}
