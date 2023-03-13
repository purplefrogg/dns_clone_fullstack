import { useEffect, useState } from 'react'
import { SignUpForm } from './signUpForm'

export const SignUp = () => {
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
      <button onClick={() => setShow(true)}>Sign Up</button>
      {show && <SignUpForm setShow={(v) => setShow(v)} />}
    </>
  )
}
