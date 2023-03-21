import { type Category } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import { DeleteButton } from '~/admin/shared/deleteButton'
import { api, type RouterOutputs } from '~/utils/api'

const ColumnOfParent = ({ current }: { current?: Category | null }) => {
  const { data } = api.admin.getCategories.useQuery({
    onlyOneLevel: {
      level: '3',
      reverse: true,
    },
  })

  return (
    <div>
      <select className=''>
        {current && <option value={current.title}>{current.title}</option>}
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
export const categoryListColumn = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('title', {
    header: () => 'title',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor((row) => row.slug, {
    id: 'slug',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>slug</span>,
  }),
  columnHelper.accessor('parentId', {
    header: () => 'parentId',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('parent', {
    header: () => 'Parent Title',
    cell: (info) => (
      <div>
        <ColumnOfParent current={info.getValue()} />
      </div>
    ),
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
  }),
  columnHelper.accessor('id', {
    id: 'delete',
    header: () => '',
    cell: (info) => {
      const utils = api.useContext()
      const { mutate } = api.admin.deleteCategory.useMutation({
        onSuccess: () => {
          void utils.admin.invalidate()
        },
      })

      return (
        <>
          <DeleteButton deleteHandler={() => mutate(+info.getValue())} />
        </>
      )
    },
  }),
]
