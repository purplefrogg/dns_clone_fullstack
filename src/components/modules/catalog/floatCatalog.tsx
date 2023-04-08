import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useBlockScroll } from '~/components/hooks/useBlockScroll'
import { CatalogCategories, subCategoryAtom } from './catalog'
import { FloatCatalogMobile } from './floatCatalog.mobile'

export const FloatCatalog = () => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const [subCategory] = useAtom(subCategoryAtom)
  useBlockScroll(!!subCategory)

  return (
    <>
      {subCategory && <FloatCatalogMobile />}
      {!isHomePage && subCategory && (
        <div className='sticky top-16 z-20 mx-auto hidden  w-full max-w-6xl md:block'>
          <div className=' z-10 w-full  max-w-6xl  text-black'>
            <CatalogCategories />
          </div>
        </div>
      )}
    </>
  )
}
