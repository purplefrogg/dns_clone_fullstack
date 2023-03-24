import { type NextPage } from 'next'
import { CatalogCategories } from '~/components/modules/catalog/catalog'
import { RecentOpened } from '~/components/modules/recentOpened/recentOpened'

const Home: NextPage = () => {
  return (
    <>
      <div className='flex'>
        <div className='min-w-[224px]'>
          <CatalogCategories />
        </div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
        et delectus corrupti? Repudiandae facere accusamus, neque commodi
        provident quia rem nesciunt autem. Earum facere eaque corrupti
        consequuntur quos assumenda. Totam.
      </div>
      <RecentOpened />
    </>
  )
}

export default Home
