import { useAtom } from 'jotai'
import Link from 'next/link'
import { useTranslate } from '../hooks/useTrans'
import { subCategoryAtom } from '../modules/catalog/catalog'

export const MobileNav = () => {
  const [, setSubCategory] = useAtom(subCategoryAtom)

  const text = useTranslate({
    keys: [
      'header.dns',
      'header.comparison',
      'header.favorite',
      'header.cart',

      'header.catalog',
      'header.home',
      'header.sign-in',
      'header.sign-out',
    ],
  })
  const navItems = [
    {
      title: text['header.home'],
      link: '/',
    },
    {
      title: text['header.catalog'],
      onClickHandler: () => {
        setSubCategory(-1)
      },
    },
    {
      title: text['header.cart'],
      link: '/cart',
    },
  ]
  return (
    <div className='fixed bottom-0 flex w-full justify-between gap-2 bg-white md:hidden'>
      {navItems.map((item) => (
        <div onClick={item.onClickHandler} key={item.title}>
          {item.link ? <Link href={item.link}>{item.title}</Link> : item.title}
        </div>
      ))}
    </div>
  )
}
