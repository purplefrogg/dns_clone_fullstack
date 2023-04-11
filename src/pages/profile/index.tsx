import { type GetServerSideProps, type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { authOptions } from '~/server/api/auth'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

const Profile: NextPage = () => {
  const { data } = useSession()
  const signOutHandler = () => {
    void signOut()
  }
  return (
    <div>
      <h1>Profile</h1>
      <div>name: {data?.user.name}</div>
      <div>email: {data?.user.email}</div>
      <div>role: {data?.user.role}</div>
      <button
        onClick={signOutHandler}
        className='rounded border border-red-600 p-2 text-red-400'
      >
        sign out
      </button>
    </div>
  )
}
export default Profile
