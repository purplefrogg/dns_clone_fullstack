import { useAtom } from 'jotai'
import { useEffect, type FC } from 'react'
import { BreadCrumbs } from '~/components/elements/breadCrumbs'
import { recentOpenedItems } from '~/components/modules/recentOpened/recentOpened.store'
import { api } from '~/utils/api'
import { ProductPropertyList } from './product.property.list'

export const Product: FC<{ id: number }> = ({ id }) => {
  const [recentOpened, setRecentOpened] = useAtom(recentOpenedItems)
  const { data, isError } = api.product.getById.useQuery(id)

  useEffect(() => {
    if (data && !recentOpened.includes(data.product.id)) {
      setRecentOpened([...recentOpened, data.product.id])
    }
  }, [data, recentOpened, setRecentOpened])
  if (isError) {
    return <div>error</div>
  }

  if (!data) {
    return <div>loading...</div>
  }

  const { product, crumbs } = data
  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs crumbs={crumbs} />
      <h1 className='text-2xl font-semibold'>{product?.name}</h1>
      <div className='block-element flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold '>Features {product.name}</h2>
        <ProductPropertyList properties={product.ProductProperty} />
      </div>

      <div className='block-element flex flex-col gap-4'>
        <h2 className='text-lg font-semibold'>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  )
}
