import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data } = useSession()
  const navItems = [
    { title: 'comparison', link: '/comparison' },
    { title: 'favorite', link: '/favorite' },
    { title: 'cart', link: '/cart' },
    { title: 'profile', link: '/profile' },
  ]

  return (
    <div className='bg-white shadow'>
      <div className='m-auto flex max-w-6xl gap-4 p-2 '>
        <Link
          className='block rounded-lg bg-orange-400 px-4 py-2 text-3xl font-bold text-white'
          href={'/'}
        >
          DNS
        </Link>
        <input
          type='text'
          placeholder='поиск по сайту'
          className='flex-1 rounded-lg bg-gray-100'
        />
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
