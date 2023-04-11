import { useAtom } from 'jotai'
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { useTranslate } from '../hooks/useTrans'
import { subCategoryAtom } from '../modules/catalog/catalog'
import { NavItem } from './header.navItem'

export const MobileNav = () => {
  const [, setSubCategory] = useAtom(subCategoryAtom)

  const text = useTranslate({
    keys: [
      'header.dns',
      'header.comparison',
      'header.favorite',
      'header.cart',
      'header.profile',
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
      Icon: AiOutlineHome,
    },
    {
      title: text['header.catalog'],
      onClickHandler: () => {
        setSubCategory(-1)
      },
      link: '',
      component: 'button',
      Icon: AiOutlineUnorderedList,
    },
    {
      title: text['header.cart'],
      Icon: BsCart3,

      link: '/cart',
    },
    {
      title: text['header.profile'],
      Icon: VscAccount,

      link: '/profile',
    },
  ]
  return (
    <div className='h-16'>
      <div className='fixed bottom-0 flex w-full justify-between gap-2 bg-white px-4 py-2 md:hidden'>
        {navItems.map((item) => (
          <NavItem
            className='active:text-orange-400'
            Component={item.component}
            href={item.link}
            key={item.title}
            onClick={item.onClickHandler}
            icon={item.Icon}
          >
            {item.title}
          </NavItem>
        ))}
      </div>
    </div>
  )
}
