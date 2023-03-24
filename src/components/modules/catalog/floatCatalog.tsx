import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { CatalogCategories, subCategoryAtom } from './catalog'

export const FloatCatalog = () => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const [subCategory] = useAtom(subCategoryAtom)
  return (
    <>
      {!isHomePage && subCategory && (
        <div className=' mx-auto  w-full  max-w-6xl text-black'>
          <div className='absolute top-16 z-10 w-full  max-w-6xl  text-black'>
            <CatalogCategories />
          </div>
        </div>
      )}
    </>
  )
}
