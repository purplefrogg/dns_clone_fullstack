import Link from 'next/link'
import { IoIosArrowDown, IoIosHeartEmpty } from 'react-icons/io'
import { useAtom } from 'jotai'
import { subCategoryAtom } from '../modules/catalog/catalog'
import { SignControl } from '../modules/auth/signControl'
import { HeaderSearch } from './header.search'
import { NavItem } from './header.navItem'
import { IoStatsChartOutline } from 'react-icons/io5'
import { CartButton } from '../pages/cart/cart.button'
export const Header = () => {
  const navItems = [
    { title: 'comparison', link: '/comparison', icon: IoStatsChartOutline },
    { title: 'favorite', link: '/favorite', icon: IoIosHeartEmpty },
  ]

  return (
    <div className='bg-white shadow'>
      <div className='m-auto flex max-w-6xl gap-4 p-2 '>
        <div className='flex gap-4 rounded-lg bg-orange-400 px-4 py-2 text-white'>
          <Link className='text-3xl font-bold ' href={'/'}>
            DNS
          </Link>
          <ButtonShowCatalog />
        </div>
        <HeaderSearch />
        <nav className='each flex items-center gap-2 [&>*]:w-20 [&>*]:flex-1'>
          {navItems.map((item) => (
            <NavItem href={item.link} icon={item.icon} key={item.title}>
              {item.title}
            </NavItem>
          ))}
          <CartButton />
          <SignControl />
        </nav>
      </div>
    </div>
  )
}

const ButtonShowCatalog = () => {
  const [, setSubCategory] = useAtom(subCategoryAtom)

  return (
    <button
      onClick={() => {
        setSubCategory(-1)
      }}
      className='flex items-center justify-center gap-2 rounded bg-orange-500 px-2'
    >
      catalog <IoIosArrowDown />
    </button>
  )
}
