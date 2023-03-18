import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CategoryType } from './types'

export const CategoryItem = ({ category }: { category: CategoryType }) => {
  if (category.subCategories.length === 0) {
    return <CategoryItemWithoutSub category={category} />
  }
  return <CategoryItemWithSub category={category} />
}

const CategoryItemWithoutSub = ({ category }: { category: CategoryType }) => {
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

export const CategoryItemWithSub = ({
  category,
}: {
  category: CategoryType
}) => {
  const [onHover, setOnHover] = useState(false)
  const path = useRouter().asPath
  return (
    <div
      className='relative h-64 w-64 rounded-md bg-white shadow'
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className={`p-4 transition-all duration-500  ${
          !onHover ? 'absolute top-0 opacity-0' : ''
        }`}
      >
        <Link
          className='font-semibold hover:text-orange-400'
          href={`/catalog/${category.slug}`}
        >
          {category.title}
        </Link>
        <ul>
          {category.subCategories.map((subCategory) => (
            <li className='hover:text-orange-400' key={subCategory.id}>
              <Link href={`${path}/${subCategory.slug}`}>
                {subCategory.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`flex flex-col items-center  justify-center p-4 text-center transition-all duration-500 hover:opacity-0 ${
          onHover ? 'pointer-events-none absolute  left-4 top-0 opacity-0' : ''
        }`}
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
      </div>
    </div>
  )
}
