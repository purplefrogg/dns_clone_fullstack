import { api } from '~/utils/api'
import { MainCatalog } from './catalog.main'
import { SubCatalog } from './catalog.sub'
import { CatalogBackground } from './catalog.background'
import { cn } from '~/utils/cn'
import { atom, useAtom } from 'jotai'

export const subCategoryAtom = atom<number | null>(null)

export const CatalogCategories = () => {
  const [subCategory, setSubCategory] = useAtom(subCategoryAtom)
  const { data, error } = api.category.getAll.useQuery()

  return (
    <>
      <CatalogBackground
        hide={() => setSubCategory(null)}
        isHide={!subCategory}
      />
      <div
        className={cn(
          'z-10 flex gap-4  rounded-lg bg-white p-2',
          subCategory ? 'absolute max-h-96 w-full max-w-6xl' : ''
        )}
      >
        {error && <div>{error.message}</div>}
        {data && (
          <>
            <MainCatalog
              categories={data.categories}
              subCategory={subCategory}
              setSubCategory={setSubCategory}
            />
            <SubCatalog
              onSelectCategory={() => setSubCategory(null)}
              categories={
                data.categories?.find((category) => category.id === subCategory)
                  ?.subCategories
              }
            />
          </>
        )}
      </div>
    </>
  )
}
