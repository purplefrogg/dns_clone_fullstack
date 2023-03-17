import { useRouter } from 'next/router'
import { type FC } from 'react'
import { api } from '~/utils/api'

interface SignInFormProps {
  setShow: (show: boolean) => void
}

export const SignInForm: FC<SignInFormProps> = ({ setShow }) => {
  const router = useRouter()
  const { mutate, error } = api.auth.signIn.useMutation({
    onSuccess: (data) => {
      sessionStorage.setItem('token', data)
      setShow(false)
      void router.push('/profile')
    },
  })

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setShow(false)
      }}
      className='absolute top-0 right-0 z-50 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-50'
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const inputs = Object.fromEntries(formData)
          mutate({
            email: inputs.email as string,
            password: inputs.password as string,
          })
        }}
        className='flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='text-2xl font-bold'>Sign In</div>
        <label className='flex justify-between  gap-2'>
          Email
          <input type='email' name='email' required />
        </label>
        <label className='flex justify-between  gap-2'>
          password
          <input type='password' name='password' required minLength={3} />
        </label>
        {error && <div className='text-red-500'>{error.message}</div>}
        <button type='submit'>continue</button>
      </form>
    </div>
  )
}
