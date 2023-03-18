import { api, RouterOutputs } from '~/utils/api'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { BiTrash } from 'react-icons/bi'
const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getCategories'][number]>()
const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor((row) => row.slug, {
    id: 'slug',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>slug</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('title', {
    header: () => 'title',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('parentId', {
    header: () => 'parentId',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('subCategories', {
    header: () => 'subCategories',
    cell: (info) => (
      <div>
        {info.renderValue()?.map((subCategory) => (
          <div key={subCategory.title}>{subCategory.title}</div>
        ))}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('id', {
    id: 'delete',
    header: () => '',
    cell: (info) => <DeleteButton id={info.getValue()} />,
    footer: (info) => info.column.id,
  }),
]
export const CategoryList = () => {
  const { data, error } = api.admin.getCategories.useQuery()
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (!data) return null
  if (error) return <div>{error.message}</div>

  return (
    <div className='flex flex-col'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DeleteButton = ({ id }: { id: number }) => {
  const utils = api.useContext()

  const { mutate } = api.admin.deleteCategory.useMutation({
    onSuccess: () => {
      void utils.admin.getCategories.invalidate()
    },
  })
  return (
    <div
      onClick={() => {
        mutate(id)
      }}
      className='cursor-pointer rounded hover:text-red-500'
    >
      <BiTrash />
    </div>
  )
}
