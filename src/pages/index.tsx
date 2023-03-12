import { type NextPage } from 'next'
import { CatalogCategories } from '~/components/catalog'
import { RecentOpened } from '~/modules/recentOpened/recentOpened'

const Home: NextPage = () => {
  return (
    <>
      <CatalogCategories />
      <RecentOpened />
    </>
  )
}

export default Home
