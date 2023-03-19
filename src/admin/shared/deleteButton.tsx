import { BiTrash } from 'react-icons/bi'

export const DeleteButton = ({
  deleteHandler,
}: {
  deleteHandler: () => () => void
}) => {
  const onDelete = deleteHandler()
  return (
    <div
      onClick={onDelete}
      className='cursor-pointer rounded hover:text-red-500'
    >
      <BiTrash />
    </div>
  )
}
