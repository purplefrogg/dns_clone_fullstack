import { type NextPage } from 'next'
import { CatalogCategories } from '~/components/modules/catalog/catalog'
import { RecentOpened } from '~/components/modules/recentOpened/recentOpened'

const Home: NextPage = () => {
  return (
    <>
      <CatalogCategories />
      <RecentOpened />
    </>
  )
}

export default Home
