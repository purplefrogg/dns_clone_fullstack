import { type FC } from 'react'
import { CartItem } from './cartItem'
type CartItemsProps = {
  items: number[]
  onDelete: (id: number) => void
  onError: (id: number) => void
}
export const CartItems: FC<CartItemsProps> = ({ items, onDelete, onError }) => {
  return (
    <>
      {items.map((id) => (
        <CartItem id={id} onDelete={onDelete} onError={onError} key={id} />
      ))}
    </>
  )
}
