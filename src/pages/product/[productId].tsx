import { useRouter } from 'next/router'
import { BreadCrumbs } from '~/components/breadCrumbs'

import { api } from '~/utils/api'
import { type NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { productId } = router.query

  if (typeof productId !== 'string') {
    void router.push('/404')
    return null
  }
  const { data } = api.product.getById.useQuery(+productId)
  const { data: crumbs } = api.product.getCrumbs.useQuery(+productId)

  if (!crumbs || !data) return <div>loading...</div>

  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs crumbs={[...crumbs, { text: data.name }]} />
      <h1 className='text-2xl font-semibold'>{data?.name}</h1>
      <div className='block-element flex flex-col gap-4 p-4'>
        <h2 className='text-xl font-semibold '>Features {data.name}</h2>
        {data.ProductProperty.map((property) => (
          <div className='' key={property.title}>
            <h3 className='text-lg font-semibold'>{property.title}</h3>
            {property.PropertyField.map((field) => (
              <div className='flex gap-4' key={field.id}>
                <div className='w-64 border-b-2 border-dotted '>
                  {field.title}
                </div>
                <span>{field.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='block-element flex flex-col gap-4'>
        <h2 className='text-lg font-semibold'>Description</h2>
        <p>{data.description}</p>
      </div>
    </div>
  )
}

export default Page
