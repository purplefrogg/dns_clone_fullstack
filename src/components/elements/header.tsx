import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { SignUp } from '../modules/auth/signUp/signUp'
import { IoIosArrowDown } from 'react-icons/io'
import { useAtom } from 'jotai'
import { CatalogCategories, subCategoryAtom } from '../modules/catalog/catalog'
import { useRouter } from 'next/router'
export const Header = () => {
  const { data } = useSession()
  const navItems = [
    { title: 'comparison', link: '/comparison' },
    { title: 'favorite', link: '/favorite' },
    { title: 'cart', link: '/cart' },
    { title: 'admin', link: '/admin' },
    { title: 'profile', link: '/profile' },
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
        <SignUp />
        <nav className='flex  items-center gap-2'>
          {navItems.map((item) => (
            <Link href={item.link} key={item.title}>
              {item.title}
            </Link>
          ))}
          {data ? (
            <>
              <div>{data.user.id}</div>
              <button onClick={() => void signOut()}>sign out</button>
            </>
          ) : (
            <button onClick={() => void signIn()}>sign in</button>
          )}
        </nav>
      </div>
    </div>
  )
}

const ButtonShowCatalog = () => {
  const router = useRouter()
  const isHomePage = router.route === '/'
  const [subCategory, setSubCategory] = useAtom(subCategoryAtom)

  return (
    <>
      <button
        onClick={() => {
          setSubCategory(-1)
        }}
        className='flex items-center justify-center gap-2 rounded bg-orange-500 px-2'
      >
        catalog <IoIosArrowDown />
      </button>
      {!isHomePage && subCategory && (
        <div className='absolute top-16 left-0 w-full'>
          <div className='relative  '>
            <CatalogCategories />
          </div>
        </div>
      )}
    </>
  )
}
