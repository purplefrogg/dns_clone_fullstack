import Head from 'next/head'
import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { api } from '~/utils/api'
import { CategoryItems } from './category.items'

export const Catalog_lvl_1 = () => {
  const { data } = api.category.getAll.useQuery()
  if (!data) {
    return <div>loading</div>
  }
  const { categories } = data
  const crumbs = [{ text: 'Catalog', to: '/catalog' }]

  return (
    <>
      <Head>
        <title>Catalog of Categories. Find there what you need</title>
        <meta name='description' content='' />
      </Head>
      <BreadCrumbs crumbs={crumbs} />
      <CategoryItems categories={categories} />
    </>
  )
}
