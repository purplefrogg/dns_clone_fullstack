import { Table } from '~/admin/shared/table'
import { api } from '~/utils/api'
import { UserListColumns } from './userList.column'

export const UserList = () => {
  const { data } = api.admin.getUsers.useQuery()
  if (!data) return null
  return <Table data={data} columns={UserListColumns} />
}
