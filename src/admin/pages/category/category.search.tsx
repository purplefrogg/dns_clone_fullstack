import { useEffect, useState } from 'react'
import { useSearch } from './category.store'

export const CategorySearch = () => {
  const { setSearchParam } = useSearch()
  const [search, setSearch] = useState('')
  useEffect(() => {
    if (!search) setSearchParam(null)
  }, [search, setSearchParam])
  return (
    <div className='group-[]: flex gap-4'>
      <input
        className='focus: peer rounded-md border border-gray-300 shadow-sm ring-opacity-50 focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-200 '
        type='text peer'
        required
        value={search}
        placeholder='type here to search'
        onChange={(e) => {
          setSearch(e.currentTarget.value)
        }}
      />
      <button
        className='rounded-md border border-gray-400 px-2   text-neutral-400 shadow-sm ring-opacity-50 focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-200 peer-valid:border-gray-900 peer-valid:text-black'
        disabled={!search}
        onClick={() => {
          setSearchParam(search)
        }}
      >
        search
      </button>
    </div>
  )
}
