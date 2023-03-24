import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
import { useAtom } from 'jotai'
import { subCategoryAtom } from '../modules/catalog/catalog'
import { SignControl } from '../modules/auth/SignControl'
export const Header = () => {
  const navItems = [
    { title: 'comparison', link: '/comparison' },
    { title: 'favorite', link: '/favorite' },
    { title: 'cart', link: '/cart' },
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
        <input
          type='text'
          placeholder='поиск по сайту'
          className='flex-1 rounded-lg bg-gray-100'
        />
        <nav className='flex  items-center gap-2'>
          <SignControl />
          {navItems.map((item) => (
            <Link href={item.link} key={item.title}>
              {item.title}
            </Link>
          ))}
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
