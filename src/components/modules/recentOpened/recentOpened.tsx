import { type FC } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
import { api } from '~/utils/api'
import { useRecentOpenedItems } from './recentOpened.hooks'
import { RecentOpenedItem } from './recentOpened.item'

export const RecentOpened: FC = () => {
  const text = useTranslate({ keys: ['recentlyOpened'] })
  const { store, deleteItem } = useRecentOpenedItems()
  const { data } = api.product.getByIds.useQuery(store)
  if (!data) {
    return <div>loading...</div>
  }
  return (
    <div className='block-element flex flex-col gap-4'>
      <h2 className='text-2xl'>{text.recentlyOpened}</h2>
      <div className='flex gap-4'>
        {data.map((product) => (
          <RecentOpenedItem
            deleteHandler={(id) => deleteItem(id)}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
