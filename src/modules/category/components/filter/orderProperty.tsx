import { useRouterQuery } from '~/hooks/useRouterQuery'

export const OrderProperty = () => {
  const { query, router } = useRouterQuery<'orderDirection' | 'orderType'>([
    'orderType',
    'orderDirection',
  ])

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
      <option value={'price-desc'}>Price high to low</option>
      <option value={'price-asc'}>Price low to high</option>
    </select>
  )
}
