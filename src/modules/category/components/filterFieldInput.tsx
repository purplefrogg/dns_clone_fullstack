import { FC } from 'react'

interface FilterFieldInputProps {
  title: string
  value: number
  checked?: boolean
  changeHandler: (value: string) => void
}

export const FilterFieldInput: FC<FilterFieldInputProps> = ({
  title,
  value,
  checked,
  changeHandler,
}) => (
  <label className='flex items-center justify-center gap-1'>
    <input
      type='checkbox'
      value={value}
      defaultChecked={checked}
      onChange={() => changeHandler(value.toString())}
    />
    {title}
  </label>
)
