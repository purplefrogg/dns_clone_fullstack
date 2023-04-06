/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { cn } from '~/utils/cn'
import { type ToastType, addToastAtom, ToastListAtom } from './toaster.store'

const listeners: ((toast: ToastType) => void)[] = []

export const toast = (toast: Omit<ToastType, 'id' | 'hidden'>) => {
  if (!listeners[0]) return
  listeners[0](toast)
}

export const Toaster = () => {
  const toastList = useAtom(ToastListAtom)[0]
  const addToast = useAtom(addToastAtom)[1]

  useEffect(() => {
    listeners[0] = addToast
  }, [])
  return (
    <div className='absolute top-0 right-0 z-50 m-4 flex flex-col-reverse gap-4'>
      {toastList.map((toast, index) => (
        <div
          key={index}
          className={`block-element w-64 ${
            toast.hidden ? 'hidden' : ''
          } overflow-hidden bg-white/50  text-center backdrop-blur-sm`}
        >
          {toast?.message}
          <div
            className={cn(
              '-mx-2 h-1 w-64 -translate-x-full animate-moveX',
              toast.type === 'success' && 'bg-green-600',
              toast.type === 'error' && 'bg-red-600',
              toast.type === 'info' && 'bg-neutral-500'
            )}
          ></div>
        </div>
      ))}
    </div>
  )
}
