import { api } from '~/utils/api'
import { useSearch } from './category.store'
import { Table } from '~/admin/shared/table'
import { categoryListColumn } from './categoryList.column'

export const CategoryList = () => {
  const { searchParam } = useSearch()
  const { data, error } = api.admin.getCategories.useQuery(
    searchParam ?? undefined
  )

  if (!data) return null
  if (error) return <div>{error.message}</div>

  return (
    <div className='flex flex-col'>
      <Table columns={categoryListColumn} data={data} />
    </div>
  )
}
