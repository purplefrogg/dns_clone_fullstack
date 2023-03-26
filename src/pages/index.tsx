import { type NextPage } from 'next'
import Head from 'next/head'
import { CatalogCategories } from '~/components/modules/catalog/catalog'
import { RecentOpened } from '~/components/modules/recentOpened/recentOpened'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name='description' content='home page' />
      </Head>
      <div className='mt-2 flex'>
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
