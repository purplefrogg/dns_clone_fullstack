import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'

export const BreadCrumbs = ({}) => {
  const router = useRouter()
  const { category, category2, productId } = router.query
  if (typeof productId === 'string') {
    const { data } = api.product.getCategoryOfProduct.useQuery(
      parseInt(productId)
    )
    const lvl1 = data?.category.parent
    const lvl2 = data?.category
    return (
      <div className='flex gap-4'>
        <Link href={'/catalog'}>catalog</Link>
        {lvl1 && (
          <Link href={`/catalog/${lvl1.slug.toString()}`}>{lvl1?.title}</Link>
        )}
        {lvl2 && lvl1 && (
          <Link
            href={`/catalog/${lvl1.slug.toString()}/${lvl2.slug.toString()}`}
          >
            {lvl2.title}
          </Link>
        )}
      </div>
    )
  }
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
