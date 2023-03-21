import { api, type RouterOutputs } from '~/utils/api'
import { createColumnHelper } from '@tanstack/react-table'
import { useSearch } from './category.store'
import { Table } from '~/admin/shared/table'
import { DeleteButton } from '~/admin/shared/deleteButton'
const useDeleteProps = (id: number) => {
  const utils = api.useContext()
  const { mutate } = api.admin.deleteCategory.useMutation({
    onSuccess: () => {
      void utils.admin.invalidate()
    },
  })
  return () => mutate(id)
}
const ColumnOfParent = ({ current }: { current?: string }) => {
  const { data } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
      reverse: true,
    },
  })

  return (
    <div>
      <select className=''>
        {current && <option value={current}>{current}</option>}
        <option value=''>without Parent</option>
        {data?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  )
}

const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getCategories'][number]>()
const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor('title', {
    header: () => 'title',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.slug, {
    id: 'slug',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>slug</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('parentId', {
    header: () => 'parentId',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('parent.title', {
    header: () => 'Parent Title',
    cell: (info) => (
      <div>
        <ColumnOfParent current={info.getValue()} />
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('subCategories', {
    header: () => 'Sub Categories',
    cell: (info) => {
      const categories = info.getValue()
      return (
        <div className='group'>
          <div>{categories.length}</div>
          <div className='absolute hidden flex-col gap-2  bg-white shadow group-hover:flex'>
            {info.renderValue()?.map((subCategory) => (
              <div className='px-2' key={subCategory.title}>
                {subCategory.title}
              </div>
            ))}
          </div>
        </div>
      )
    },
    footer: (info) => info.column.id,
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
export const CategoryList = () => {
  const { searchParam, search } = useSearch()
  const { data, error } = api.admin.getCategories.useQuery(
    search ? searchParam : undefined
  )

  if (!data) return null
  if (error) return <div>{error.message}</div>

  return (
    <div className='flex flex-col'>
      <Table columns={columns} data={data} />
    </div>
  )
}
