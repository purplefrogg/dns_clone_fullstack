import { signIn } from 'next-auth/react'
import { type FC, useState } from 'react'
type SignInReturnType = {
  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string | undefined
  /**
   * HTTP status code,
   * hints the kind of error that happened.
   */
  status: number
  /**
   * `true` if the signin was successful
   */
  ok: boolean
  /**
   * `null` if there was an error,
   * otherwise the url the user
   * should have been redirected to.
   */
  url: string | null
}
export const SignInForm: FC<{ closeWindow: () => void }> = ({
  closeWindow,
}) => {
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
        Email
        <input type='email' name='email' required />
      </label>
      <label className='flex justify-between  gap-2'>
        password
        <input type='password' name='password' required minLength={3} />
      </label>
      {error && (
        <div className='text-red-500'>Email or password are incorrect</div>
      )}
      <button type='submit'>continue</button>
    </form>
  )
}
