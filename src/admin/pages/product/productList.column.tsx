import { createColumnHelper } from '@tanstack/react-table'
import { DeleteButton } from '~/admin/shared/deleteButton'
import { api, type RouterOutputs } from '~/utils/api'

const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getProductList'][number]>()

export const ProductListColumns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor((key) => key.locale[0]?.name, {
    id: 'name',
    header: () => 'Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('price', {
    id: 'slug',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>price</span>,
  }),
  columnHelper.accessor('category', {
    id: 'category',
    cell: (info) => {
      const category = info.getValue()
      return <i>{category ? category.slug : 'not selected'}</i>
    },
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor((key) => key.locale[0]?.description, {
    id: 'description',
    header: () => 'Description',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('id', {
    id: 'delete',
    header: () => '',
    cell: (info) => {
      const utils = api.useContext()
      const { mutate } = api.admin.deleteProduct.useMutation({
        onSuccess: () => {
          void utils.admin.invalidate()
        },
      })

      return (
        <>
          <DeleteButton deleteHandler={() => mutate(info.getValue())} />
        </>
      )
    },
  }),
]
