import { api } from '~/utils/api'

let userAgent = false

export const useIsMobile = () => {
  if (userAgent) return true

  const userAgentServer =
    api.useContext().ssrContext?.req?.headers['user-agent']
  if (userAgentServer)
    userAgent = Boolean(
      userAgentServer.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
  if (typeof window === 'undefined') return userAgent
  const userAgentClient = navigator.userAgent
  if (userAgentClient)
    userAgent = Boolean(
      userAgentClient.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )

  return userAgent
}
