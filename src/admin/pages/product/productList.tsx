import { Table } from '~/admin/shared/table'
import { api } from '~/utils/api'
import { ProductListColumns } from './productList.column'

export const ProductList = () => {
  const { data, error } = api.admin.getProductList.useQuery()

  if (!data) return null
  if (error) return <div>{error.message}</div>

  return <Table data={data} columns={ProductListColumns} />
}
