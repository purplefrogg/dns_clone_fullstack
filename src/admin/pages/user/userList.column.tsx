import { createColumnHelper } from '@tanstack/react-table'
import { FC } from 'react'
import { DeleteButton } from '~/admin/shared/deleteButton'
// import { DeleteButton } from '~/admin/shared/deleteButton'
import { api, type RouterOutputs } from '~/utils/api'

const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getUsers'][number]>()

export const UserListColumns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('email', {
    header: () => 'Email',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('role', {
    header: () => 'Role',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('address', {
    header: () => 'Address',
    cell: (info) => info.renderValue() || 'N/A',
  }),

  columnHelper.accessor('createdAt', {
    header: () => 'Created At',
    cell: (info) => info.getValue().toISOString(),
  }),
  columnHelper.accessor('id', {
    id: 'delete',
    header: () => 'delete',
    cell: (info) => (
      <>
        <DeleteButtonWrap id={info.getValue()} />
      </>
    ),
  }),
]
const DeleteButtonWrap: FC<{ id: number }> = ({ id }) => {
  const utils = api.useContext()
  const { mutate } = api.admin.deleteUsers.useMutation({
    onSuccess: () => {
      void utils.admin.getUsers.invalidate()
    },
  })

  return (
    <>
      <DeleteButton deleteHandler={() => mutate(id)} />
    </>
  )
}
