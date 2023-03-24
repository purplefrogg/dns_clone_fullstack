import { type FC } from 'react'
import { api } from '~/utils/api'

export const SignUpForm: FC<{ closeWindow: () => void }> = ({
  closeWindow,
}) => {
  const { mutate, error } = api.auth.signUp.useMutation()
  const submitHandler = (inputs: { [k: string]: FormDataEntryValue }) => {
    mutate({
      name: inputs.name as string,
      phone: inputs.phone as string,
      password: inputs.password as string,
      email: inputs.email as string,
    })
    closeWindow()
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const inputs = Object.fromEntries(formData)
        submitHandler(inputs)
      }}
      className='flex flex-col gap-2 '
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <label className='flex justify-between gap-2'>
        name
        <input type='text' name='name' required />
      </label>
      <label className='flex justify-between  gap-2'>
        Surname
        <input type='text' name='surname' required />
      </label>
      <label className='flex justify-between  gap-2'>
        phone
        <input type='number' name='phone' required />
      </label>
      <label className='flex justify-between  gap-2'>
        password
        <input type='password' name='password' required minLength={3} />
      </label>
      <label className='flex justify-between  gap-2'>
        Email
        <input type='email' name='email' required />
      </label>
      {error && <div className='text-red-500'>{error.message}</div>}
      <button type='submit'>continue</button>
    </form>
  )
}
