import { useRouter } from 'next/router'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { FilterFieldInput } from '../filterFieldInput'

interface FilterFieldProps {
  title: string
  slug: string
  inputs: RouterOutputs['category']['getProducts']['filter'][number]['PropertyField']
}

export const FilterField: FC<FilterFieldProps> = ({ title, inputs, slug }) => {
  const router = useRouter()

  const changeHandler = (value: string) => {
    const query = router.query[slug]
    if (query) {
      if (typeof query === 'string') {
        if (query === value) {
          delete router.query[slug]
          console.log(router.query)
        }
      } else if (query.includes(value)) {
        router.query[slug] = query.filter((v: string) => v !== value)
      } else {
        router.query[slug] = [...query, value]
      }
    } else {
      router.query[slug] = [value]
    }
    void router.push({ pathname: router.pathname, query: router.query })
  }

  return (
    <div>
      <h3>{title}</h3>
      <div className='flex gap-4'>
        {inputs.map(({ value }) => {
          const checked = router.query[slug]?.includes(value.id.toString())
          console.log(checked)

          return (
            <FilterFieldInput
              checked={checked}
              value={value.id}
              changeHandler={changeHandler}
              title={value.value}
              key={value.id}
            />
          )
        })}
      </div>
    </div>
  )
}
