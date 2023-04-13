import { useRouter } from 'next/router'
import { useState, type FC } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { type RouterOutputs } from '~/utils/api'
import { cn } from '~/utils/cn'
import { FilterFieldInput } from './filterFieldInput'

type Props =
  RouterOutputs['category']['getProducts']['properties'][number]['field'][number]

export const FilterField: FC<Props> = ({ about, FieldValue }) => {
  const router = useRouter()
  const { slug, locale } = about
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
  const [collapsed, setCollapsed] = useState(true)
  return (
    <div className='flex flex-col gap-2'>
      <button
        className='flex items-center justify-between rounded text-start hover:text-neutral-700'
        onClick={() => setCollapsed((p) => !p)}
      >
        {locale[0]?.title}
        <AiOutlineArrowDown
          className={cn(
            'transition-transform',
            collapsed && 'rotate-180',
            !collapsed && 'rotate-0'
          )}
        />
      </button>

      <div
        className={cn(
          'flex flex-wrap gap-4 overflow-hidden',
          collapsed && 'h-0'
        )}
      >
        {FieldValue.map((value) => {
          const checked = router.query[slug]?.includes(value.value)

          return (
            <FilterFieldInput
              checked={checked}
              value={value.value}
              changeHandler={changeHandler}
              title={value.value}
              key={value.value}
            />
          )
        })}
      </div>
    </div>
  )
}
