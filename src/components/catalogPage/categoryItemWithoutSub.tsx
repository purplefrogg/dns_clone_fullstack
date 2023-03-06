import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type RouterOutputs } from '~/utils/api'

type CategoryType = Exclude<
  RouterOutputs['category']['getSubCategories'],
  null
>['subCategories'][number]

export const CategoryItemWithoutSub = ({
  category,
}: {
  category: CategoryType
}) => {
  const path = useRouter().asPath

  return (
    <Link
      href={`${path}/${category.slug}`}
      className={
        'flex h-64 w-64  flex-col items-center justify-center rounded-md bg-white p-4 text-center shadow'
      }
    >
      {category.image && (
        <Image
          className='h-48 w-48'
          width={192}
          height={192}
          unoptimized
          priority
          src={category.image}
          alt=''
        />
      )}
      {category.title}
    </Link>
  )
}
