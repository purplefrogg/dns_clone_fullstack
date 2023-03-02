import Link from 'next/link'
import { useRouter } from 'next/router'

export const BreadCrumbs = ({}) => {
  const router = useRouter()
  const { category, category2 } = router.query

  return (
    <div className='flex gap-4'>
      <Link href={'/catalog'}>catalog</Link>
      {category && (
        <Link href={`/catalog/${category.toString()}`}>{category}</Link>
      )}
      {category2 && category && (
        <Link href={`/catalog/${category.toString()}/${category2.toString()}`}>
          {category2}
        </Link>
      )}
    </div>
  )
}
