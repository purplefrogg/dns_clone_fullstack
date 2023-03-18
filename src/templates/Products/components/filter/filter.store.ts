import { atom } from 'jotai'

export const maxPriceAtom = atom(0, (get, set, value: number) => {
  set(maxPriceAtom, value)
})

export const minPriceAtom = atom(0, (get, set, value: number) => {
  set(minPriceAtom, value)
})
export const priceRangeAtom = atom((get) => [
  get(minPriceAtom),
  get(maxPriceAtom),
])
