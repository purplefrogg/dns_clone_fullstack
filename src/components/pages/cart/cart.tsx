import { useCartItems } from './hooks'
import { EmptyCart } from './emptyCart'
import { CartItems } from './cartItems'
import { useTranslate } from '~/components/hooks/useTrans'

export const Cart = () => {
  const { storeMounted, store, deleteItem } = useCartItems()
  const text = useTranslate({
    nameSpace: 'cart',
    keys: ['cart'],
  })
  if (!storeMounted) return <div>loading...</div>
  return (
    <div>
      <h1 className='text-2xl font-semibold'>{text.cart}</h1>
      <div className='block-element flex flex-col gap-4'>
        {store.length === 0 && <EmptyCart />}
        <CartItems
          items={store}
          onDelete={(id: number) => deleteItem(id)}
          onError={deleteItem}
        />
      </div>
    </div>
  )
}
