import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { type RouterOutputs } from '~/utils/api'

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
    <form className='flex flex-col gap-4' onSubmit={submitHandler}>
      <PriceProperty {...{ minPrice, maxPrice, setMaxPrice, setMinPrice }} />
      <OrderProperty />
      {props.filter?.map((filter) => (
        <div key={filter.id}>
          <h3>{filter.title}</h3>
          <ul className='flex flex-col gap-2'>
            {filter.PropertyField.map((value) => (
              <li key={value.value.value}>
                <label>
                  <input
                    type='checkbox'
                    defaultChecked={router.query[filter.slug]?.includes(
                      value.value.id.toString()
                    )}
                    name={value.value.value}
                    onChange={() => {
                      router.query.page = '1'
                      let queryFilter = router.query[filter.slug]
                      if (queryFilter) {
                        queryFilter = queryFilter.toString().split(',')
                      }
                      if (queryFilter && Array.isArray(queryFilter)) {
                        if (queryFilter.includes(value.value.id.toString())) {
                          router.query[filter.slug] = queryFilter.filter(
                            (id) => id !== value.value.value
                          )
                        } else {
                          router.query[filter.slug] = [
                            ...queryFilter,
                            value.value.id.toString(),
                          ]
                        }
                      } else {
                        router.query[filter.slug] = [value.value.id.toString()]
                      }

                      void router.push({
                        pathname: router.pathname,
                        query: router.query,
                      })
                    }}
                  />
                  {value.value.value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className='rounded bg-orange-400 p-2 text-white' type='submit'>
        submit
      </button>
    </form>
  )
}
