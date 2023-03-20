import { createColumnHelper } from '@tanstack/react-table'
import { DeleteButton } from '~/admin/shared/deleteButton'
import { Table } from '~/admin/shared/table'
import { api, RouterOutputs } from '~/utils/api'
const useDeleteProps = (id: number) => {
  const utils = api.useContext()
  const { mutate } = api.admin.deleteProduct.useMutation({
    onSuccess: () => {
      void utils.admin.invalidate()
    },
  })
  return () => mutate(id)
}

const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getProductList'][number]>()
const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('price', {
    id: 'slug',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>price</span>,
  }),
  columnHelper.accessor('category.title', {
    id: 'category',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('description', {
    header: () => 'Description',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('id', {
    id: 'delete',
    header: () => '',
    cell: (info) => (
      <>
        <DeleteButton deleteHandler={() => useDeleteProps(+info.getValue())} />
      </>
    ),
    footer: (info) => info.column.id,
  }),
]

export const ProductList = () => {
  const { data, error } = api.admin.getProductList.useQuery()

  if (!data) return null
  if (error) return <div>{error.message}</div>

  return (
    <div className='block-element w-full'>
      <Table data={data} columns={columns} />
    </div>
  )
}
