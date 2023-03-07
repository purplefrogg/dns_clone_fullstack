import { atomWithStorage } from 'jotai/utils'
export const cartAtom = atomWithStorage<number[]>('cartStorage', [])
