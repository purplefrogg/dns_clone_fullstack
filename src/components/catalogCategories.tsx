import Link from 'next/link'
import { useState } from 'react'
import { api } from '~/utils/api'

export const CatalogCategories = () => {
  const { data } = api.category.getAll.useQuery()

  const [subCatalog, setSubCatalog] = useState<number | null>()
  return (
    <div className=' '>
      {subCatalog && (
        <div
          onClick={() => setSubCatalog(null)}
          className={'fixed top-0 right-0 h-full w-full  bg-black opacity-30'}
        ></div>
      )}
      <div className='relative z-50 m-2 flex gap-4 rounded-lg bg-white'>
        <div className=''>
          {data?.map((category) => (
            <div
              onMouseEnter={() => setSubCatalog(category.id)}
              key={category.id}
              className={subCatalog === category.id ? 'text-orange-400' : ''}
            >
              {category.title}
            </div>
          ))}
        </div>

        {subCatalog && (
          <div className='flex-1'>
            {data
              ?.find((category) => category.id === subCatalog)
              ?.subCategories.map((subCategory) => (
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
        )}
      </div>
    </div>
  )
}
