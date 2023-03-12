import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { FilterField } from './filterField'

import { OrderProperty } from './orderProperty'
import { PriceProperty } from './priceProperty'

interface FilterProps {
  minPrice: number
  maxPrice: number
  filter: RouterOutputs['category']['getProducts']['filter']
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
    <form
      className='flex flex-col gap-4 rounded-md bg-white p-3'
      onSubmit={submitHandler}
    >
      <PriceProperty {...{ minPrice, maxPrice, setMaxPrice, setMinPrice }} />
      <OrderProperty />
      {props.filter?.map((filter) => (
        <FilterField
          key={filter.id}
          title={filter.title}
          slug={filter.slug}
          inputs={filter.PropertyField}
        />
      ))}
      <button
        onClick={() => {
          void router.push({
            pathname: router.pathname,
            query: {
              category: router.query.category,
              category2: router.query.category2,
              page: '1',
            },
          })
        }}
        type='reset'
        className='rounded bg-orange-400 p-2 text-white'
      >
        reset
      </button>
      <button className='rounded bg-orange-400 p-2 text-white' type='submit'>
        submit
      </button>
    </form>
  )
}
