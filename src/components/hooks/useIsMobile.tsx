import { api } from '~/utils/api'
let userAgent = false
export const useIsMobile = () => {
  if (userAgent) return true
  const utils = api.useContext()
  console.log(utils.ssrState)
  const userAgentSsr = api.useContext().ssrContext?.req?.headers['user-agent']
  if (userAgentSsr)
    userAgent = Boolean(
      userAgentSsr.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )

  const userAgentClient =
    typeof window === 'undefined' ? '' : navigator.userAgent
  if (userAgentClient)
    userAgent = Boolean(
      userAgentClient.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
  return userAgent
}
