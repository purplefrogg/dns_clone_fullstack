import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const alreadyExist = router.query.error === 'OAuthAccountNotLinked'
  return (
    <div className='flex items-center justify-center rounded bg-white p-10 text-2xl'>
      {alreadyExist && 'this account already exist'}
    </div>
  )
}

export default Page
