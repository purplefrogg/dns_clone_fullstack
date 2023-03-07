import Link from 'next/link'
import { type FC } from 'react'

interface BreadCrumbsProps {
  crumbs: { text: string; to?: string }[]
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <div className='flex'>
      {crumbs.map((crumb) => (
        <div key={crumb.to} className='group'>
          {crumb.to ? (
            <Link
              className='transition-all hover:text-orange-400'
              href={crumb.to}
            >
              {crumb.text}
            </Link>
          ) : (
            <span className='text-neutral-500'>{crumb.text}</span>
          )}
          <span className='px-4 text-neutral-500 group-last:hidden'>{'>'}</span>
        </div>
      ))}
    </div>
  )
}
