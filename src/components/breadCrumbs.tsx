import Link from 'next/link'
import { type FC } from 'react'

interface BreadCrumbsProps {
  crumbs: { text: string; to?: string }[]
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <div className='flex gap-4'>
      {crumbs.map((crumb) =>
        crumb.to ? (
          <Link key={crumb.to} href={crumb.to}>
            {crumb.text}
          </Link>
        ) : (
          <span key={crumb.text}>{crumb.text}</span>
        )
      )}
    </div>
  )
}
