import { type FC } from 'react'
import { MaxPrice } from './priceProperty.max'
import { MinPrice } from './priceProperty.min'

export const PriceProperty: FC = () => {
  return (
    <>
      <MinPrice />
      <MaxPrice />
    </>
  )
}
