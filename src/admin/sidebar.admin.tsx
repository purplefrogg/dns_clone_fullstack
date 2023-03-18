import Link from 'next/link'

export const Sidebar = () => {
  const links = [
    { href: '/admin/category', label: 'category' },
    { href: '/admin/users', label: 'users' },
  ]
  return (
    <div className='w-64 bg-white'>
      <div className='flex flex-col gap-4'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='rounded-md text-lg hover:bg-blue-200'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
