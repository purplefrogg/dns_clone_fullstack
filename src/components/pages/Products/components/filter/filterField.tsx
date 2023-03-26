import { useRouter } from 'next/router'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'
import { FilterFieldInput } from './filterFieldInput'

type Props =
  RouterOutputs['category']['getProducts']['properties'][number]['field'][number]

export const FilterField: FC<Props> = ({ about, FieldValue }) => {
  const router = useRouter()
  const { slug, title } = about
  const changeHandler = (value: string) => {
    const query = router.query[slug]
    if (query) {
      if (typeof query === 'string') {
        if (query === value) {
          delete router.query[slug]
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
      <div className='flex flex-wrap gap-4'>
        {FieldValue.map((value) => {
          const checked = router.query[slug]?.includes(value.value)

          return (
            <FilterFieldInput
              checked={checked}
              value={value.value}
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
