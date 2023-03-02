import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const { category } = router.query

  return <p>Post: {category}</p>
}

export default Page
