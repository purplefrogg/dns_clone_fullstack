import Link from 'next/link'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface SubCatalogProps {
  categories?: RouterOutputs['category']['getAll']['categories'][number]['subCategories']
}
export const SubCatalog: FC<SubCatalogProps> = ({ categories }) => {
  if (!categories) return null
  return (
    <div className='relative z-10 m-2 flex gap-4 rounded-lg bg-white'>
      <div className='flex-1'>
        {categories.map((subCategory) => (
          <div key={subCategory.id}>
            <Link
              href={`catalog/${subCategory.slug}`}
              className='block font-semibold hover:text-orange-400'
            >
              {subCategory.title}
            </Link>
            {subCategory.subCategories.map((lvl3Category) => (
              <Link
                key={lvl3Category.id}
                href={`catalog/${subCategory.slug}/${lvl3Category.slug}`}
                className='block  text-sm hover:text-orange-400'
              >
                {lvl3Category.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
