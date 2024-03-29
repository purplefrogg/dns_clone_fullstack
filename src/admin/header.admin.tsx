import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data } = useSession()
  const navItems: { title: string; link: string }[] = []

  return (
    <div className='bg-white shadow'>
      <div className='m-auto flex max-w-6xl justify-between gap-4 p-2'>
        <Link
          className='block rounded-lg bg-orange-400 px-4 py-2 text-3xl font-bold text-white'
          href={'/'}
        >
          DNS
        </Link>

        <nav className='flex  items-center gap-2'>
          {navItems.map((item) => (
            <Link href={item.link} key={item.title}>
              {item.title}
            </Link>
          ))}
          {data ? (
            <>
              <div>
                {data.user.name}({data.user.role})
              </div>
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
