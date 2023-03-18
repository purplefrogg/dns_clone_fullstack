import { type FieldValue, type PropertyFieldAbout } from '@prisma/client'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { HTMLProps, type FC } from 'react'
import { priceRangeAtom } from './filter.store'
import { FilterField } from './filterField'

interface FilterProps extends HTMLProps<HTMLDivElement> {
  filter: (PropertyFieldAbout & {
    PropertyField: {
      value: FieldValue
    }[]
  })[]
}

export const Filter: FC<FilterProps> = ({ children, ...props }) => {
  const router = useRouter()
  const [priceRange] = useAtom(priceRangeAtom)
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.query.minPrice = priceRange[0]?.toString()
    router.query.maxPrice = priceRange[1]?.toString()
    router.query.page = '1'
    void router.push({ pathname: router.pathname, query: router.query })
  }

  const resetHandler = () => {
    void router.push({
      pathname: router.pathname,
      query: {
        category: router.query.category,
        category2: router.query.category2,
        page: '1',
      },
    })
  }

  return (
    <form
      className='flex flex-col gap-4 rounded-md bg-white p-3'
      onSubmit={submitHandler}
    >
      {children}
      {props.filter?.map((filter) => (
        <FilterField key={filter.id} {...filter} />
      ))}
      <button
        onClick={resetHandler}
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
