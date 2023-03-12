import { type FC, useState } from 'react'

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
}) => {
  const [checkedState, setCheckedState] = useState<boolean>(!!checked)
  return (
    <label className='flex items-center justify-center gap-1'>
      <input
        type='checkbox'
        checked={checkedState}
        onChange={() => {
          setCheckedState((p) => !p)
          changeHandler(value.toString())
        }}
      />
      {title}
    </label>
  )
}
