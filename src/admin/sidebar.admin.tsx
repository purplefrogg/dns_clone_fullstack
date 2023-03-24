import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '~/utils/cn'

type LinksType = {
  active?: boolean
  href: string
  label: string

  subLinks?: LinksType[]
}

export const Sidebar = () => {
  const router = useRouter()
  const { catchAll } = router.query
  console.log('catchAll', catchAll)
  const links: LinksType[] = [
    { href: '/admin', label: 'Home', active: !catchAll },
    {
      href: '/admin/category',
      label: 'Category',
      active: catchAll ? catchAll[0] === 'category' : false,
    },
    {
      href: '/admin/users',
      label: 'Users',
      active: catchAll ? catchAll[0] === 'users' : false,
    },
    {
      href: '/admin/products',
      label: 'Products',
      active: catchAll ? catchAll[0] === 'products' : false,
    },
  ]

  return (
    <div className='block-element w-64'>
      <div className='flex flex-col gap-2'>
        {links.map((link) => (
          <div className='flex flex-col' key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'rounded-md p-1 text-lg hover:bg-blue-200',
                link.active && 'bg-blue-200'
              )}
            >
              {link.label}
            </Link>
            <div className='ml-2 flex flex-col border-l-2 border-neutral-400 pl-2'>
              {link.subLinks?.map((subLink) => (
                <Link
                  className={cn(
                    'ml-2 px-2 hover:bg-blue-200',
                    subLink.active && 'bg-blue-200'
                  )}
                  key={subLink.href}
                  href={subLink.href}
                >
                  {subLink.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
