import { useState } from 'react'
import { RouterOutputs } from '~/utils/api'

export const CategoryItem = ({
  category,
}: {
  category: RouterOutputs['category']['getAll'][number]
}) => {
  const [onHover, setOnHover] = useState(false)
  return (
    <div
      className='relative h-64 w-64 rounded-md bg-white shadow'
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className={`p-4 transition-all duration-500  ${
          !onHover ? 'absolute top-0 opacity-0' : ''
        }`}
      >
        {category.title}
        <ul>
          {category.subCategories.map((subCategory) => (
            <li className='hover:text-orange-400' key={subCategory.id}>
              {subCategory.title}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`flex flex-col items-center  justify-center p-4 text-center transition-all duration-500 hover:opacity-0 ${
          onHover ? 'pointer-events-none absolute  left-4 top-0 opacity-0' : ''
        }`}
      >
        {category.image && (
          <img className='h-48 w-48' src={category.image as string} alt='' />
        )}
        {category.title}
      </div>
    </div>
  )
}
