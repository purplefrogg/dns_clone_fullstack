import { useState } from 'react'
import { api } from '~/utils/api'
import { MainCatalog } from './catalog.main'
import { SubCatalog } from './catalog.sub'
import { CatalogBackground } from './catalog.background'

export const CatalogCategories = () => {
  const { data, error } = api.category.getAll.useQuery()
  const [subCategory, setSubCategory] = useState<number | null>(null)
  if (error) {
    return <div>{error.message}</div>
  }
  if (!data) {
    return <div>loading...</div>
  }
  const { categories } = data
  return (
    <div className=' '>
      <CatalogBackground
        hide={() => setSubCategory(null)}
        isHide={!subCategory}
      />
      <div className='relative z-10 m-2 flex gap-4 rounded-lg bg-white'>
        <MainCatalog
          categories={categories}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
        />
        <SubCatalog
          categories={
            categories?.find((category) => category.id === subCategory)
              ?.subCategories
          }
        />
      </div>
    </div>
  )
}
