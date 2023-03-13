import { useState, useEffect } from 'react'
import { SignInForm } from './signInForm'

export const SignIn = () => {
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
      <button onClick={() => setShow(true)}>Sign In</button>
      {show && <SignInForm setShow={(v) => setShow(v)} />}
    </>
  )
}
