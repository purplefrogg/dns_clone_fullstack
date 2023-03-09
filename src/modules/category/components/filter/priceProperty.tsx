import { atom, useAtom } from 'jotai'
import { FC, useEffect } from 'react'
import { useRouterQuery } from '~/hooks/useRouterQuery'

interface PricePropertyProps {
  minPrice: number
  maxPrice: number
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

export const PriceProperty: FC<PricePropertyProps> = (props) => {
  return (
    <>
      <label className='flex w-56 justify-between'>
        from
        <input
          className='rounded border border-neutral-400'
          name='minPrice'
          type='number'
          min={props.minPrice}
          max={props.maxPrice}
          defaultValue={props.minPrice}
          onChange={(e) => props.setMinPrice(+e.target.value)}
        />
      </label>
      <label className='flex w-56 justify-between'>
        to
        <input
          name='maxPrice'
          className='rounded border border-neutral-400'
          type='number'
          inputMode='numeric'
          max={props.maxPrice}
          min={props.minPrice}
          defaultValue={props.maxPrice}
          onChange={(e) => props.setMaxPrice(+e.target.value)}
        />
      </label>
    </>
  )
}
