import { type GetServerSideProps, type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
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
  return (
    <div>
      <h1>Profile</h1>
      {data?.user.name}
    </div>
  )
}
export default Profile
