import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { OrderProperty } from './orderProperty'
import { PriceProperty } from './priceProperty'

interface FilterProps {
  minPrice: number
  maxPrice: number
}

export const Filter: FC<FilterProps> = (props) => {
  const router = useRouter()
  const [minPrice, setMinPrice] = useState(props.minPrice)
  const [maxPrice, setMaxPrice] = useState(props.maxPrice)
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.query.minPrice = minPrice.toString()
    router.query.maxPrice = maxPrice.toString()
    router.query.page = '1'
    void router.push({ pathname: router.pathname, query: router.query })
  }
  return (
    <form className='flex flex-col gap-4' onSubmit={submitHandler}>
      <PriceProperty {...{ minPrice, maxPrice, setMaxPrice, setMinPrice }} />
      <OrderProperty />

      <button className='rounded bg-orange-400 p-2 text-white' type='submit'>
        submit
      </button>
    </form>
  )
}
