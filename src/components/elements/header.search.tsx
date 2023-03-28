import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '~/utils/api'
import { TbMoodEmpty } from 'react-icons/Tb'
export const HeaderSearch = ({ placeholder }: { placeholder: string }) => {
  const [search, setSearch] = useState('')
  const { data, refetch } = api.product.search.useQuery(search, {
    enabled: false,
  })

  useEffect(() => {
    const cancel = setTimeout(() => {
      if (search) void refetch()
    }, 1000)

    return () => {
      clearTimeout(cancel)
    }
  }, [refetch, search])

  return (
    <div className='group relative flex flex-1'>
      <input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={placeholder}
        className=' peer flex-1 rounded-lg bg-gray-100 px-4'
      />
      {search && (
        <div className='absolute top-16 z-10 hidden w-full flex-col rounded bg-white  group-active:flex  peer-focus-within:flex'>
          {data?.length === 0 && (
            <div className='flex flex-col items-center text-center'>
              <TbMoodEmpty className='text-neutral-600' size={50} /> there is no
              product
            </div>
          )}
          {data?.map((item) => (
            <Link
              className='cursor-pointer hover:bg-neutral-100'
              key={item.id}
              href={`/product/${item.id}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
