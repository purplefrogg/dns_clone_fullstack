import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { type HTMLProps, type FC } from 'react'
import { useBlockScroll } from '~/components/hooks/useBlockScroll'
import { useIsMobile } from '~/components/hooks/useIsMobile'
import { useTranslate } from '~/components/hooks/useTrans'
import { type RouterOutputs } from '~/utils/api'
import { cn } from '~/utils/cn'
import { FilterHiddenAtom, priceRangeAtom } from './filter.store'
import { FilterField } from './filterField'

interface FilterProps extends HTMLProps<HTMLDivElement> {
  filter: RouterOutputs['category']['getProducts']['properties']
}
export const Filter: FC<FilterProps> = ({
  children,

  filter: filters,
}) => {
  const router = useRouter()
  const [hidden, setHidden] = useAtom(FilterHiddenAtom)
  const [priceRange] = useAtom(priceRangeAtom)
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHidden(true)
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
  const text = useTranslate({ nameSpace: 'filter', keys: ['reset', 'submit'] })
  const isMobile = useIsMobile()
  useBlockScroll(!hidden && isMobile)
  return (
    <form
      onReset={() => {
        setHidden(true)
      }}
      className={cn(
        isMobile
          ? 'absolute flex h-full w-full max-w-6xl flex-col gap-4 overflow-scroll overscroll-contain rounded-md bg-white p-3 pb-60'
          : 'hidden w-64 flex-col gap-4 rounded-md bg-white p-3 md:flex',
        hidden && 'hidden'
      )}
      onSubmit={submitHandler}
    >
      {children}
      {filters.map((filter) => (
        <div
          className='flex flex-col gap-2 rounded bg-neutral-50 p-2'
          key={filter.id}
        >
          <span className='text-lg font-semibold'>
            {filter.title.locale[0]?.title}
          </span>
          {filter.field.map((field) => (
            <FilterField key={field.id} {...field} />
          ))}
        </div>
      ))}
      <button
        onClick={resetHandler}
        type='reset'
        className='rounded bg-orange-400 p-2 text-white'
      >
        {text.reset}
      </button>
      <button className='rounded bg-orange-400 p-2 text-white' type='submit'>
        {text.submit}
      </button>
    </form>
  )
}
