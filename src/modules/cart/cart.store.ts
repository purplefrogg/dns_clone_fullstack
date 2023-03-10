import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const cartItems = atomWithStorage<number[]>('cartItems', [])
export const cartItemsMount = atom(false)
cartItemsMount.onMount = (setAtom) => setAtom(true)

export const deleteCartItem = atom(null, (get, set, update: number) => {
  const cart = get(cartItems)
  if (cart) {
    set(
      cartItems,
      cart.filter((item) => item !== update)
    )
  }
})
