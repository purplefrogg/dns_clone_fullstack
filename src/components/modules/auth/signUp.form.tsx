import { type FC } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
import { api } from '~/utils/api'

export const SignUpForm: FC<{ closeWindow: () => void }> = ({
  closeWindow,
}) => {
  const text = useTranslate({
    keys: [
      'form.name',
      'form.surname',
      'form.phone',
      'form.password',
      'form.email',

      'form.continue',
    ],
  })
  const { mutate, error } = api.auth.signUp.useMutation({
    onSuccess: () => {
      closeWindow()
    },
  })
  const submitHandler = (inputs: { [k: string]: FormDataEntryValue }) => {
    mutate({
      name: inputs.name as string,
      phone: inputs.phone as string,
      password: inputs.password as string,
      email: inputs.email as string,
    })
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
        {text['form.name']}
        <input type='text' name='name' required />
      </label>
      <label className='flex justify-between  gap-2'>
        {text['form.surname']}
        <input type='text' name='surname' required />
      </label>
      <label className='flex justify-between  gap-2'>
        {text['form.phone']}
        <input type='number' name='phone' required />
      </label>
      <label className='flex justify-between  gap-2'>
        {text['form.password']}
        <input type='password' name='password' required minLength={3} />
      </label>
      <label className='flex justify-between  gap-2'>
        {text['form.email']}
        <input type='email' name='email' required />
      </label>
      {error && <div className='text-red-500'>{error.message}</div>}
      <button type='submit'>{text['form.continue']}</button>
    </form>
  )
}
