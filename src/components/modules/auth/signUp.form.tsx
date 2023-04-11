import { type InputHTMLAttributes, type FC } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'
import { api } from '~/utils/api'
import { toast } from '../toaster/toaster'

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
      toast({
        message: 'success',
        type: 'success',
      })
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
  const inputs: {
    title: string
    props: InputHTMLAttributes<HTMLInputElement>
  }[] = [
    {
      title: text['form.name'],
      props: {
        required: true,
        name: 'name',
        type: 'text',
      },
    },
    {
      title: text['form.surname'],
      props: {
        required: true,
        name: 'surname',
        type: 'text',
      },
    },
    {
      title: text['form.phone'],
      props: {
        type: 'number',
        name: 'phone',
        required: true,
      },
    },
    {
      title: text['form.password'],
      props: {
        required: true,
        name: 'password',
        type: 'password',
        minLength: 3,
      },
    },
    {
      title: text['form.email'],
      props: {
        required: true,
        name: 'email',
        type: 'email',
      },
    },
  ]
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
      {inputs.map((input) => (
        <label key={input.title} className='flex justify-between  gap-2'>
          {input.title}
          <input className='border' {...input.props} />
        </label>
      ))}
      {error && <div className='text-red-500'>{error.message}</div>}
      <button type='submit'>{text['form.continue']}</button>
    </form>
  )
}
