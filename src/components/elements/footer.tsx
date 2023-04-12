import Link from 'next/link'

export const Footer = () => {
  const links = [
    {
      source: 'github',
      title: 'github.com/purplefrogg',
      url: 'https://github.com/purplefrogg',
    },
    {
      source: 'telegram',
      title: '@Wwefil',
      url: 'https://t.me/Wwefil',
    },
  ] as const
  return (
    <div className='bg-neutral-700'>
      <footer className='m-auto flex max-w-6xl flex-col gap-2  py-2 text-white'>
        {links.map((item) => (
          <div key={item.source} className='flex gap-2'>
            {item.source}:
            <Link
              className='underline decoration-solid hover:text-orange-400'
              target='_blank'
              href={item.url}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </footer>
    </div>
  )
}
