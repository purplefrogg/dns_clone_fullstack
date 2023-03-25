import { type FC, useEffect, useState } from 'react'
import { SignUpForm } from './signUp.form'
import * as Tabs from '@radix-ui/react-tabs'
import { signOut, useSession } from 'next-auth/react'
import { SignInForm } from './signIn.form'
import { NavItem } from '~/components/elements/header.navItem'
import { VscSignIn, VscSignOut } from 'react-icons/vsc'

const TabsDemo: FC<{ closeWindow: () => void }> = ({ closeWindow }) => {
  return (
    <Tabs.Root className='h-64 w-96 rounded bg-white p-4' defaultValue='tab1'>
      <Tabs.List className='flex justify-around'>
        <Tabs.Trigger
          className='  border-black p-2 text-base data-[state=active]:border-b-2'
          value='tab1'
        >
          Sign Up
        </Tabs.Trigger>
        <Tabs.Trigger
          className='  border-black p-2 text-base data-[state=active]:border-b-2'
          value='tab2'
        >
          Sign In
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className='TabsContent' value='tab1'>
        <SignUpForm closeWindow={closeWindow} />
      </Tabs.Content>
      <Tabs.Content className='TabsContent' value='tab2'>
        <SignInForm closeWindow={closeWindow} />
      </Tabs.Content>
    </Tabs.Root>
  )
}
export const SignControl = () => {
  const session = useSession()

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])
  const onClickHandler = session.data?.user
    ? () => {
        void signOut()
      }
    : () => {
        setShow(true)
      }
  return (
    <>
      <NavItem
        href=''
        icon={session.data ? VscSignOut : VscSignIn}
        onClick={onClickHandler}
        Component={'div'}
      >
        {session.data?.user ? 'Sign Out' : 'Sign Up'}
      </NavItem>

      {show && (
        <div
          onClick={() => setShow(false)}
          className='absolute top-0 right-0 z-50 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-50 backdrop-blur-sm'
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <TabsDemo closeWindow={() => setShow(false)} />
          </div>
        </div>
      )}
    </>
  )
}
