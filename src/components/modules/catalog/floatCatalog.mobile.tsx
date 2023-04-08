import { useAtom } from 'jotai'
import { api } from '~/utils/api'
import { subCategoryAtom } from './catalog'
import * as Accordion from '@radix-ui/react-accordion'
import Link from 'next/link'
import { IoCloseOutline } from 'react-icons/io5'
import { useTranslate } from '~/components/hooks/useTrans'
import { useBlockScroll } from '~/components/hooks/useBlockScroll'

export const FloatCatalogMobile = () => {
  const [, setSubCategory] = useAtom(subCategoryAtom)
  const { data } = api.category.getAll.useQuery()
  const text = useTranslate({
    keys: ['header.catalog'],
  })
  useBlockScroll(!!setSubCategory)
  return (
    <div className='fixed z-20 h-full w-full bg-white p-2 md:hidden'>
      <div className='flex justify-between'>
        {text['header.catalog']}
        <button
          onClick={() => setSubCategory(null)}
          className=' flex h-8 w-8 items-center justify-center rounded-full bg-none hover:bg-neutral-100 active:bg-neutral-200'
        >
          <IoCloseOutline />
        </button>
      </div>
      <Accordion.Root type='multiple'>
        {data?.categories.map((category) => (
          <Accordion.Item value={category.slug} key={category.id}>
            <Accordion.Trigger>{category.locale[0]?.title}</Accordion.Trigger>
            <Accordion.Content className='bg-neutral-50 pl-4 shadow-inner'>
              {category.subCategories.map((subCategory) => (
                <div key={subCategory.id}>
                  <Accordion.Item value={subCategory.slug}>
                    <Accordion.Trigger>
                      {subCategory.locale[0]?.title}
                    </Accordion.Trigger>
                    <Accordion.Content className='  pl-4 '>
                      {subCategory.subCategories.map((subSubCat) => (
                        <Link
                          onClick={() => setSubCategory(null)}
                          className='block duration-100  ease-linear hover:pl-2'
                          href={`/catalog/${category.slug}/${subSubCat.slug}`}
                          key={subSubCat.id}
                        >
                          {subSubCat.locale[0]?.title}
                        </Link>
                      ))}
                    </Accordion.Content>
                  </Accordion.Item>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
