import { type GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { LayoutAdmin } from '~/admin/layout.admin'
import AdminRoot from '~/admin/admin'
import { authOptions } from '~/server/api/auth'
import { type NextPageWithLayout } from '../_app'
import { useRouter } from 'next/router'
import { CategoryRoot } from '~/admin/pages/category/category'
import { ProductRoot } from '~/admin/pages/product/product'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  console.log('session', session)

  return {
    props: {},
  }
}
const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { catchAll } = router.query
  if (!catchAll) return <AdminRoot />
  switch (catchAll[0]) {
    case 'products':
      return <ProductRoot add={catchAll[1] === 'add'} />
    case 'category':
      return <CategoryRoot />
    default:
      return <AdminRoot />
  }
}
Page.getLayout = (page) => <LayoutAdmin>{page}</LayoutAdmin>
export default Page
