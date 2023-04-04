import Link from 'next/link'
import { type FC } from 'react'
import { type RouterOutputs } from '~/utils/api'

interface SubCatalogProps {
  categories?: RouterOutputs['category']['getAll']['categories'][number]['subCategories']
  onSelectCategory: () => void
}
export const SubCatalog: FC<SubCatalogProps> = ({
  categories,
  onSelectCategory,
}) => {
  if (!categories) return null
  return (
    <div className=' z-10 flex gap-4'>
      <div className='flex-1'>
        {categories.map((subCategory) => (
          <div key={subCategory.id}>
            <Link
              href={`/catalog/${subCategory.slug}`}
              className='block font-semibold hover:text-orange-400'
              onClick={onSelectCategory}
            >
              {subCategory.locale[0]?.title}
            </Link>
            {subCategory.subCategories.map((lvl3Category) => (
              <Link
                key={lvl3Category.id}
                href={`/catalog/${subCategory.slug}/${lvl3Category.slug}`}
                onClick={onSelectCategory}
                className='block  text-sm hover:text-orange-400'
              >
                {lvl3Category.locale[0]?.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
