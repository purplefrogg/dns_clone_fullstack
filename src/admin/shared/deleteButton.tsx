import { BiTrash } from 'react-icons/bi'

export const DeleteButton = ({
  deleteHandler,
}: {
  deleteHandler: () => void
}) => {
  return (
    <div
      onClick={deleteHandler}
      className='cursor-pointer rounded hover:text-red-500'
    >
      <BiTrash />
    </div>
  )
}
