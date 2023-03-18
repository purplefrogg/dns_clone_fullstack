import { useAtom } from 'jotai'
import { type FC } from 'react'
import { maxPriceAtom } from '../filter/filter.store'

export const MaxPrice: FC = () => {
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom)
  return (
    <label className='flex w-56 justify-between'>
      to
      <input
        name='maxPrice'
        className='rounded border border-neutral-400'
        type='number'
        inputMode='numeric'
        defaultValue={maxPrice}
        onChange={(e) => setMaxPrice(+e.target.value)}
      />
    </label>
  )
}
