import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { CatalogCategories, subCategoryAtom } from './catalog'
import { FloatCatalogMobile } from './floatCatalog.mobile'

export const FloatCatalog = () => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const [subCategory] = useAtom(subCategoryAtom)
  return (
    <>
      {subCategory && <FloatCatalogMobile />}
      {!isHomePage && subCategory && (
        <div className='sticky top-16 mx-auto hidden  w-full max-w-6xl md:block'>
          <div className=' z-10 w-full  max-w-6xl  text-black'>
            <CatalogCategories />
          </div>
        </div>
      )}
    </>
  )
}
