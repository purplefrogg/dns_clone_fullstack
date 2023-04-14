import { useAtom } from 'jotai'
import { type FC } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
import { minPriceAtom } from '../filter/filter.store'

export const MinPrice: FC = () => {
  const [minPrice, setMinPrice] = useAtom(minPriceAtom)
  const { from } = useTranslate({ nameSpace: 'filter', keys: ['from'] })
  return (
    <label className='flex w-56 justify-between'>
      {from}
      <input
        className='rounded border border-neutral-400'
        name='minPrice'
        type='number'
        value={minPrice}
        onChange={(e) => {
          setMinPrice(+e.target.value)
        }}
      />
    </label>
  )
}
