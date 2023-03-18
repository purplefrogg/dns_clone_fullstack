import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data } = useSession()

  return (
    <div className='bg-white shadow'>
      <div className='flex justify-between'>
        <Link
          className='block rounded-lg bg-orange-400 px-4 py-2 text-3xl font-bold text-white'
          href={'/'}
        >
          DNS
        </Link>

        {data ? (
          <>
            <button onClick={() => void signOut()}>sign out</button>
          </>
        ) : (
          <button onClick={() => void signIn()}>sign in</button>
        )}
      </div>
    </div>
  )
}
