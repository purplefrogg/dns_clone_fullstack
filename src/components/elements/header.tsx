import Link from 'next/link'
import { IoIosArrowDown, IoIosHeartEmpty } from 'react-icons/io'
import { useAtom } from 'jotai'
import { subCategoryAtom } from '../modules/catalog/catalog'
import { SignControl } from '../modules/auth/signControl'
import { HeaderSearch } from './header.search'
import { NavItem } from './header.navItem'
import { IoStatsChartOutline } from 'react-icons/io5'
import { CartButton } from '../pages/cart/cart.button'
import { type FC } from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '../hooks/useTrans'
import { cn } from '~/utils/cn'

export const Header = () => {
  const router = useRouter()

  const text = useTranslate({
    keys: [
      'header.dns',
      'header.comparison',
      'header.favorite',
      'header.cart',

      'header.catalog',
      'header.sign-in',
      'header.sign-out',
    ],
  })

  const navItems = [
    {
      title: text['header.comparison'],
      link: '/comparison',
      icon: IoStatsChartOutline,
    },
    {
      title: text['header.favorite'],
      link: '/favorite',
      icon: IoIosHeartEmpty,
    },
  ] as const
  return (
    <div className='sticky top-0 z-20 bg-white shadow'>
      <div className='m-auto flex max-w-6xl gap-4 p-2 '>
        <div className='flex gap-4 rounded-lg bg-orange-400 px-4 py-2 text-white'>
          <Link className='text-3xl font-bold ' href={'/'}>
            {text['header.dns']}
          </Link>
          <ButtonShowCatalog title={text['header.catalog']} />
        </div>
        <HeaderSearch />
        <nav className='each hidden items-center gap-2 lg:flex [&>*]:w-20 [&>*]:flex-1'>
          {navItems.map((item) => (
            <NavItem href={item.link} icon={item.icon} key={item.title}>
              {item.title}
            </NavItem>
          ))}
          <CartButton title={text['header.cart']} />
          <SignControl
            signIn={text['header.sign-in']}
            signOut={text['header.sign-out']}
          />
        </nav>
        <div
          className={
            'group flex flex-col justify-center gap-1 hover:text-orange-400'
          }
        >
          <a
            className={cn(router.locale === 'en' && 'hidden')}
            href={router.asPath}
          >
            en
          </a>
          <a
            className={cn(router.locale === 'ru' && 'hidden')}
            href={`/ru/${router.asPath}`}
          >
            ru
          </a>
        </div>
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
      className='hidden items-center justify-center gap-2 rounded bg-orange-500 px-2 md:flex'
    >
      {title} <IoIosArrowDown />
    </button>
  )
}
