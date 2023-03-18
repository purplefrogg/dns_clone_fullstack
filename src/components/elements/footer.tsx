import Link from 'next/link'
import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'

export const Footer = () => {
  return (
    <div className='bg-neutral-700'>
      <footer className='m-auto flex max-w-6xl gap-4  py-2 text-white'>
        <FooterColumn
          title='Company'
          links={['About', 'Company', 'News To partners', 'Jobs']}
        />
        <FooterColumn
          className='flex-1'
          title='Buyers'
          links={[
            'How to place an order',
            'Payment methods',
            'Loans',
            'Delivery',
          ]}
        />
        <FooterColumn title='Stay connected'>
          <Link href={'/'}>
            8-800-77-07-999 ( from 03:00 to 22:00 )
            <br />
            <span className='text-sm'>Addresses of stores in. Moscow</span>
          </Link>
        </FooterColumn>
      </footer>
    </div>
  )
}

interface IFooterColumn
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  links?: string[]
}

const FooterColumn: FC<IFooterColumn> = ({
  title,
  links,
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <div className='border-b-2 border-b-neutral-500 pb-2 font-semibold'>
        {title}
      </div>
      {links && (
        <ul className='flex flex-col flex-wrap'>
          {links.map((link) => (
            <li key={link}>
              <Link href={'/'}>{link}</Link>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  )
}
