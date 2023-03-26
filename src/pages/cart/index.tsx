import Head from 'next/head'
import { Cart } from '~/components/pages/cart/cart'

const Page = () => {
  return (
    <>
      <Head>
        <title>Cart Page</title>
        <meta
          name='description'
          content='This page contains items for your personal shopping cart'
        />
      </Head>
      <Cart />
    </>
  )
}

export default Page
