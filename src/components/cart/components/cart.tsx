import { useAtom } from 'jotai'
import { api } from '~/utils/api'
import { cartAtom, deleteCartItem } from '../cart.store'
import { CartItem } from './cartItem'

export const Cart = () => {
  const [store] = useAtom(cartAtom)
  const { data } = api.product.getByIds.useQuery(store)
  const [, deleteItem] = useAtom(deleteCartItem)

  const onDeleteCartItem = (id: number) => deleteItem(id)

  if (!data) return <div>loading...</div>
  return (
    <div>
      <h1>Cart</h1>
      <div className='flex flex-col gap-4'>
        {data.map((product) => (
          <CartItem
            onDelete={onDeleteCartItem}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
