import { useEffect, useState } from 'react'
import { CategoryForm } from './category.add.form'

export const CategoryAdd = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])
  return (
    <>
      <button onClick={() => setShow(true)}>add Category</button>
      {show && <CategoryForm setShow={(v) => setShow(v)} />}
    </>
  )
}
