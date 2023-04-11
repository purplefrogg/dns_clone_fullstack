import { useSession } from 'next-auth/react'
import { NavItem } from '~/components/elements/header.navItem'
import { VscSignIn, VscAccount } from 'react-icons/vsc'
import { useSetAtom } from 'jotai'
import { signModalAtom } from './signModal'
import { type FC } from 'react'
import { useTranslate } from '~/components/hooks/useTrans'

export const SignControl: FC = () => {
  const session = useSession()
  const text = useTranslate({ keys: ['header.sign-in', 'header.profile'] })
  const setShow = useSetAtom(signModalAtom)

  if (session.data?.user) {
    return (
      <NavItem href='/profile' icon={VscAccount}>
        {text['header.profile']}
      </NavItem>
    )
  }
  return (
    <NavItem
      href=''
      icon={VscSignIn}
      onClick={() => {
        setShow(true)
      }}
      Component={'div'}
    >
      {text['header.sign-in']}
    </NavItem>
  )
}
