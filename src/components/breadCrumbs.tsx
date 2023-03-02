import Link from 'next/link'
import { useRouter } from 'next/router'

export const BreadCrumbs = ({}) => {
  const router = useRouter()
  const { category, category2 } = router.query

  return (
    <div className='flex gap-4'>
      <Link href={'/catalog'}>catalog</Link>
      {category && (
        <Link href={`/catalog/${category as string}`}>{category}</Link>
      )}
      {category2 && (
        <Link href={`/catalog/${category as string}/${category2 as string}`}>
          {category2}
        </Link>
      )}
    </div>
  )
}
