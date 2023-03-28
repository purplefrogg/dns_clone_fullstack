import { signOut, useSession } from 'next-auth/react'
import { NavItem } from '~/components/elements/header.navItem'
import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import { useAtom } from 'jotai'
import { signModalAtom } from './signModal'
import { type FC } from 'react'

export const SignControl: FC<{
  signIn: string
  signOut: string
}> = (props) => {
  const session = useSession()

  const [, setShow] = useAtom(signModalAtom)

  const onClickHandler = session.data?.user
    ? () => {
        void signOut()
      }
    : () => {
        setShow(true)
      }
  return (
    <NavItem
      href=''
      icon={session.data ? VscSignOut : VscSignIn}
      onClick={onClickHandler}
      Component={'div'}
    >
      {session.data?.user ? props.signOut : props.signIn}
    </NavItem>
  )
}
