import { useState } from 'react'
import { useBlockScroll } from '~/components/hooks/useBlockScroll'
import { CategoryForm } from './category.add.form'

export const CategoryAdd = () => {
  const [show, setShow] = useState(false)
  useBlockScroll(show)
  return (
    <>
      <button
        className='rounded bg-green-300 p-2'
        onClick={() => setShow(true)}
      >
        add Category
      </button>
      {show && <CategoryForm setShow={(v) => setShow(v)} />}
    </>
  )
}
