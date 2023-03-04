import { api } from '~/utils/api'

export const BreadCrumbs = ({}) => {
  const context = api.useContext().ssrContext

  console.log(context?.asPath)

  return <div className='flex gap-4'></div>
}
