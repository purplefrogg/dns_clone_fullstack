import { createColumnHelper } from '@tanstack/react-table'
import { DeleteButton } from '~/admin/shared/deleteButton'
import { api, type RouterOutputs } from '~/utils/api'

const columnHelper =
  createColumnHelper<RouterOutputs['admin']['getCategories'][number]>()
export const categoryListColumn = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('locale', {
    header: () => 'title',
    cell: (info) => info.getValue()[0]?.title,
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
    cell: (info) => info.getValue()?.locale[0]?.title ?? 'No Parent',
  }),
  columnHelper.accessor('subCategories', {
    header: () => 'Sub Categories',
    cell: (info) => {
      const categories = info.getValue()
      return (
        <div className='group'>
          <div>{categories.length}</div>
          <div className='absolute hidden flex-col gap-2  bg-white shadow group-hover:flex'>
            {categories?.map((subCategory) => (
              <div className='px-2' key={subCategory.locale[0]?.title}>
                {subCategory.locale[0]?.title}
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
