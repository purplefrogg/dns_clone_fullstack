import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { api } from '~/utils/api'

// export const getStaticProps: GetStaticProps = () => {
//   const { data } = api.category.getAll.useQuery()
//   return { props: { categories: data } }
// }

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
                <Link
                  href={`/${subCategory.slug}`}
                  className='block hover:text-orange-400'
                  key={subCategory.id}
                >
                  {subCategory.title}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
