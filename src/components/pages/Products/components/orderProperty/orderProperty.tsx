import { useRouterQuery } from '~/components/hooks/useRouterQuery'
import { useTrans } from '~/components/hooks/useTrans'

export const OrderProperty = () => {
  const { query, router } = useRouterQuery<'orderDirection' | 'orderType'>([
    'orderType',
    'orderDirection',
  ])
  const { priceLowToHigh, priceHighToLow } = useTrans({
    nameSpace: 'filter',
    keys: ['priceLowToHigh', 'priceHighToLow'],
  })

  return (
    <select
      name='order'
      defaultValue={`${query.orderType ?? 'price'}-${
        query.orderDirection ?? 'asc'
      }`}
      onChange={(e) => {
        void router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            orderType: e.currentTarget.value.split('-')[0],
            orderDirection: e.currentTarget.value.split('-')[1],
          },
        })
      }}
    >
      <option value={'price-desc'}>{priceHighToLow}</option>
      <option value={'price-asc'}>{priceLowToHigh}</option>
    </select>
  )
}
