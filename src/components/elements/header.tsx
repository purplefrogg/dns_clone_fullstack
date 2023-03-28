import Link from 'next/link'
import { IoIosArrowDown, IoIosHeartEmpty } from 'react-icons/io'
import { useAtom } from 'jotai'
import { subCategoryAtom } from '../modules/catalog/catalog'
import { SignControl } from '../modules/auth/signControl'
import { HeaderSearch } from './header.search'
import { NavItem } from './header.navItem'
import { IoStatsChartOutline } from 'react-icons/io5'
import { CartButton } from '../pages/cart/cart.button'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { useRouter } from 'next/router'
export const Header = () => {
  const router = useRouter()

  const { t } = useTranslation('common')
  const dns = t('header.dns')
  const comparison = t('header.comparison')
  const favorite = t('header.favorite')
  const cart = t('header.cart')
  const placeholder = t('header.search-placeholder')
  const catalog = t('header.catalog')
  const signInTitle = t('header.sign-in')
  const signOutTitle = t('header.sign-out')
  const navItems = [
    { title: comparison, link: '/comparison', icon: IoStatsChartOutline },
    { title: favorite, link: '/favorite', icon: IoIosHeartEmpty },
  ]

  return (
    <div className='bg-white shadow'>
      <div className='m-auto flex max-w-6xl gap-4 p-2 '>
        <div className='flex gap-4 rounded-lg bg-orange-400 px-4 py-2 text-white'>
          <Link className='text-3xl font-bold ' href={'/'}>
            {dns}
          </Link>
          <ButtonShowCatalog title={catalog} />
        </div>
        <HeaderSearch placeholder={placeholder} />
        <nav className='each flex items-center gap-2 [&>*]:w-20 [&>*]:flex-1'>
          {navItems.map((item) => (
            <NavItem href={item.link} icon={item.icon} key={item.title}>
              {item.title}
            </NavItem>
          ))}
          <CartButton title={cart} />
          <SignControl signIn={signInTitle} signOut={signOutTitle} />
        </nav>
        <Link href={router.asPath} locale='en'>
          en
        </Link>
        <Link href={router.asPath} locale='ru'>
          ru
        </Link>
      </div>
    </div>
  )
}

const ButtonShowCatalog: FC<{ title: string }> = ({ title }) => {
  const [, setSubCategory] = useAtom(subCategoryAtom)

  return (
    <button
      onClick={() => {
        setSubCategory(-1)
      }}
      className='flex items-center justify-center gap-2 rounded bg-orange-500 px-2'
    >
      {title} <IoIosArrowDown />
    </button>
  )
}
