import React, { type InputHTMLAttributes, type FC } from 'react'
import { type FieldError } from 'react-hook-form'
import { cn } from '~/utils/cn'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  title: string
  Input: FC<InputHTMLAttributes<HTMLInputElement>>
}
export const InputField: FC<InputFieldProps> = ({
  error,
  title,
  Input,
  className,
  ...inputProps
}) => {
  return (
    <label className='flex justify-between gap-2'>
      <span className='flex-1 border-b border-dashed '>{title}</span>
      <Input
        className={cn('border border-gray-300', className)}
        {...inputProps}
      />
      {error && <span className='text-red-500'>{error.message}</span>}
    </label>
  )
}
