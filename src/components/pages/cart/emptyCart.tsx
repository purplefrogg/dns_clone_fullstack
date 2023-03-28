import Link from 'next/link'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { useTranslate } from '~/components/hooks/useTrans'

export const EmptyCart = () => {
  const text = useTranslate({
    nameSpace: 'cart',
    keys: ['goToHome', 'catalog', 'cartEmpty'],
  })
  return (
    <div className='flex flex-col items-center gap-4'>
      <MdOutlineRemoveShoppingCart size={120} />
      <span className='text-xl font-semibold'>{text.cartEmpty}</span>
      <div className='flex gap-4'>
        <Link
          href={'/'}
          className='rounded-md border border-neutral-200 p-2 hover:bg-orange-400 hover:text-white hover:shadow-md'
        >
          {text.goToHome}
        </Link>
        <Link
          href={'/catalog'}
          className='rounded-md bg-orange-400  py-2 px-5 font-semibold text-white hover:shadow-md'
        >
          {text.catalog}
        </Link>
      </div>
    </div>
  )
}
