import { useRouter } from 'next/router'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { productId } = router.query

  if (typeof productId !== 'string') {
    void router.push('/404')
    return null
  }
  const { data } = api.product.getById.useQuery(parseInt(productId))
  return <div>{data?.name}</div>
}

export default Page
