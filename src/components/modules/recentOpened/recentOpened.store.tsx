import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const recentOpenedItems = atomWithStorage<number[]>(
  'recentOpenedItems',
  []
)
export const recentOpenedItemsMount = atom(false)
recentOpenedItemsMount.onMount = (setAtom) => setAtom(true)

export const deleteRecentOpenedItems = atom(
  null,
  (get, set, update: number) => {
    const cart = get(recentOpenedItems)
    if (cart) {
      set(
        recentOpenedItems,
        cart.filter((item) => item !== update)
      )
    }
  }
)
