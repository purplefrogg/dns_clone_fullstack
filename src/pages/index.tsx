import { type NextPage } from 'next'
import Head from 'next/head'
import { CatalogCategories } from '~/components/modules/catalog/catalog'
import { RecentOpened } from '~/components/modules/recentOpened/recentOpened'
import { useTranslate } from '~/components/hooks/useTrans'

const Home: NextPage = () => {
  const { title } = useTranslate({ keys: ['title'] })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='home page' />
      </Head>
      <div className='mt-2 hidden md:flex'>
        <div className=' h-40 min-w-[224px]'>
          <CatalogCategories />
        </div>
      </div>
      <RecentOpened />
    </>
  )
}

export default Home
