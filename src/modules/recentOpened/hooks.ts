import { useAtom } from 'jotai'
import {
  deleteRecentOpenedItems,
  recentOpenedItems,
  recentOpenedItemsMount,
} from './store'

export const useRecentOpenedItems = () => {
  const [store] = useAtom(recentOpenedItems)
  const [storeMounted] = useAtom(recentOpenedItemsMount)
  const [, deleteItem] = useAtom(deleteRecentOpenedItems)

  return {
    store,
    storeMounted,
    deleteItem,
  }
}
