import { atom } from 'jotai'

export type ToastType = {
  id?: number
  message: string
  hidden?: boolean
  type: 'success' | 'error' | 'info'
}

export const ToastListAtom = atom<ToastType[]>([])

export const addToastAtom = atom(null, (get, set, toast: ToastType) => {
  const id = new Date().getTime()

  set(ToastListAtom, (prev) => [...prev, { ...toast, hidden: false, id }])

  setTimeout(() => {
    set(ToastListAtom, (prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, hidden: true }
        }
        return item
      })
    })
    if (get(ToastListAtom).reduce((_acc, toast) => !!toast.hidden, false))
      set(ToastListAtom, [])
  }, 3000)
})
