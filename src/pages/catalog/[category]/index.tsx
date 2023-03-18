import { useRouter } from 'next/router'
import { type NextPageWithLayout } from '~/pages/_app'
import { Catalog_lvl_2 } from '~/templates/catalog/catalog.lvl.2'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { category } = router.query
  if (typeof category !== 'string') {
    return null
  }
  return <Catalog_lvl_2 categorySlug={category} />
}

export default Page
