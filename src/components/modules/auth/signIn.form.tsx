import { signIn } from 'next-auth/react'
import { type FC, useState } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
type SignInReturnType = {
  error: string | undefined

  status: number

  ok: boolean

  url: string | null
}
export const SignInForm: FC<{ closeWindow: () => void }> = ({
  closeWindow,
}) => {
  const text = useTranslate({
    keys: ['form.password', 'form.email', 'form.continue'],
  })
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const signInHandler = async (email: string, password: string) => {
    const signInReturn: SignInReturnType = (await signIn('credentials', {
      redirect: false,
      email,
      password,
    })) as SignInReturnType
    if (signInReturn.ok) {
      closeWindow()
    }
    if (signInReturn.error) {
      setError(signInReturn.error)
    }
  }
  const signInEmailHandler = async (email: string) => {
    const verifiedEmail = z.string().email().safeParse(email)
    if (!verifiedEmail.success) {
      return setError('email must be correct')
    }
    const signInReturn: SignInReturnType = (await signIn('email', {
      redirect: false,
      email,
    })) as SignInReturnType

    if (signInReturn.ok) {
      setError('check your mail')
    }
    if (signInReturn.error) {
      setError(signInReturn.error)
    }
  }

  return (
    <div className='flex flex-col gap-4 pt-4'>
      <form
        autoComplete='on'
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const inputs = Object.fromEntries(formData)
          void signInHandler(inputs.email as string, inputs.password as string)
        }}
        className='flex flex-col gap-2 '
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <label className='flex justify-between  gap-2'>
          {text['form.email']}
          <input
            className='border'
            autoComplete='username'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </label>
        <label className='flex justify-between  gap-2'>
          {text['form.password']}
          <input
            className='border'
            autoComplete='current-password'
            type='password'
            name='password'
            required
            minLength={3}
          />
        </label>
        {error && <div className='text-center text-red-500'>{error}</div>}
        <button type='submit'>{text['form.continue']}</button>
      </form>
      <button
        type='button'
        className='flex items-center justify-center gap-4 rounded border p-2 text-lg'
        onClick={() => void signInEmailHandler(email)}
      >
        forgot password?
      </button>
      <button
        className='flex items-center justify-center gap-4 rounded border p-2 text-lg'
        onClick={() => {
          void signIn('google', {
            redirect: false,
          })
        }}
      >
        <FcGoogle size={30} />
        Sign Up with Google
      </button>
    </div>
  )
}
