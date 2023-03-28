import { useEffect } from 'react'

export const useBlockScroll = (isBlocked: boolean) => {
  useEffect(() => {
    if (isBlocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isBlocked])
}
