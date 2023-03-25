import { type FC, useEffect } from 'react'
import { SignUpForm } from './signUp.form'
import * as Tabs from '@radix-ui/react-tabs'
import { SignInForm } from './signIn.form'
import { atom, useAtom } from 'jotai'
const FormTabs: FC<{ closeWindow: () => void }> = ({ closeWindow }) => {
  return (
    <Tabs.Root className='h-64 w-96 rounded bg-white p-4' defaultValue={'tab1'}>
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

export const signModalAtom = atom<boolean>(false)
export const SignModal = () => {
  const [show, setShow] = useAtom(signModalAtom)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])
  if (!show) return null
  return (
    <div
      onClick={() => setShow(false)}
      className='absolute top-0 right-0 z-50 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-50 backdrop-blur-sm'
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <FormTabs closeWindow={() => setShow(false)} />
      </div>
    </div>
  )
}
