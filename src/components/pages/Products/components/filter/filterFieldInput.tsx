import { type FC, useState, useEffect } from 'react'

interface FilterFieldInputProps {
  title: string
  value: string
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
  useEffect(() => {
    setCheckedState(!!checked)
  }, [checked])
  return (
    <label className='flex items-center justify-center gap-1'>
      <input
        type='checkbox'
        checked={checkedState}
        onChange={() => {
          setCheckedState((p) => !p)
          changeHandler(value)
        }}
      />
      {title}
    </label>
  )
}
