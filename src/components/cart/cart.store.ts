import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
export const cartAtom = atomWithStorage<number[]>('cartStorage', [])
export const deleteCartItem = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    set(
      cartAtom,
      get(cartAtom).filter((item) => item !== update)
    )
  }
)
