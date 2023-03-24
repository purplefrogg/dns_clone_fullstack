import { type FC } from 'react'
import { cn } from '~/utils/cn'

interface PaginationProps {
  total: number
  pageSize: number
  current: number
  onChange: (current: number) => void
}
export const Pagination: FC<PaginationProps> = ({
  total,
  pageSize,
  current,
  onChange,
}) => {
  const pages = Math.ceil(total / pageSize)
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1)
  const handlePageChange = (page: number) => {
    if (page < 1 || page > pages) return
    onChange(page)
  }
  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
      >
        prev
      </button>
      {pagesArray.map((page) => (
        <button
          className={cn(page === current && 'text-orange-400')}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(current + 1)}
        disabled={current === pages}
      >
        next
      </button>
    </div>
  )
}
