import { useAtom } from 'jotai'
import { cartAtom } from '~/components/cart/cart.store'

const Page = () => {
  const [store, setStore] = useAtom(cartAtom)
  
  return (
    <div>
      <h1>Cart</h1>
      {store.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  )
}

export default Page
