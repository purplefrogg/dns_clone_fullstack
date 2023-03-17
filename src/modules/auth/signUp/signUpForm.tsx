import { type FC } from 'react'

interface SignUpFormProps {
  setShow: (show: boolean) => void
}

export const SignUpForm: FC<SignUpFormProps> = ({ setShow }) => {
  const submitHandler = (_inputs: { [k: string]: FormDataEntryValue }) => {
    return null
  }
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
          submitHandler(inputs)
        }}
        className='flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='text-2xl font-bold'>Sign Up</div>
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
        <button type='submit'>continue</button>
      </form>
    </div>
  )
}
