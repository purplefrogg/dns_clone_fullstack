/* eslint-disable @typescript-eslint/no-misused-promises */
import { type GetServerSideProps, type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { type FC } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { authOptions } from '~/server/api/auth'
import { api, type RouterInputs } from '~/utils/api'

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
  const { data } = api.auth.getProfile.useQuery()
  const signOutHandler = () => {
    void signOut()
  }
  if (!data) return null
  return (
    <div>
      <h1>Profile</h1>
      <div>name: {data?.name}</div>
      <div>email: {data?.email}</div>
      <div>role: {data?.role}</div>
      <PasswordControl hasPassword={data?.password} />
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

const PasswordControl: FC<{ hasPassword: boolean }> = ({ hasPassword }) => {
  const utils = api.useContext()
  const { mutate, isSuccess } = api.auth.setPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getProfile.refetch()
      reset()
    },
  })
  const { register, handleSubmit, reset } =
    useForm<RouterInputs['auth']['setPassword']>()
  const onSubmit: SubmitHandler<RouterInputs['auth']['setPassword']> = (
    data
  ) => {
    mutate(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      {hasPassword && (
        <label className='flex flex-col gap-1'>
          old password
          <input
            {...register('oldPassword', { required: true })}
            type='password'
            className='w-44'
          />
        </label>
      )}
      <label className='flex flex-col gap-1'>
        new password
        <input
          {...register('newPassword', { required: true })}
          type='password'
          className='w-44'
        />
      </label>
      {isSuccess && <span className='text-green-500'>password changed</span>}
      <button className='w-44 border p-2'>change password</button>
    </form>
  )
}
