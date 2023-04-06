import { signIn } from 'next-auth/react'
import { type FC, useState } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
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
  return (
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
      {error && (
        <div className='text-red-500'>Email or password are incorrect</div>
      )}
      <button type='submit'>{text['form.continue']}</button>
    </form>
  )
}
