import { type FC } from 'react'
import { MaxPrice } from './priceProperty.max'
import { MinPrice } from './priceProperty.min'
// FIXME: infinity price when price is undefined
export const PriceProperty: FC = () => {
  return (
    <>
      <MinPrice />
      <MaxPrice />
    </>
  )
}
