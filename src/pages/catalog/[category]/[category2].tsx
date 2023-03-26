import { type NextPage } from 'next'
import { Products } from '~/components/pages/Products/products'

const Page: NextPage<{ categorySlug: string }> = ({ categorySlug }) => {
  return <Products categorySlug={categorySlug} />
}

Page.getInitialProps = (ctx) => {
  const { query } = ctx
  return { categorySlug: query.category2 as string }
}

export default Page
