import Link from 'next/link'
import React, {
  type JSXElementConstructor,
  type AnchorHTMLAttributes,
  type FC,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { type IconType } from 'react-icons'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  Component?:
    | string
    | JSXElementConstructor<
        AnchorHTMLAttributes<HTMLAnchorElement> | HTMLAttributes<HTMLDivElement>
      >
  icon?: IconType
  href: string
  children: ReactNode
}

export const NavItem: FC<Props> = ({
  Component = Link,
  children,
  icon: Icon,
  ...props
}) => {
  return (
    <Component
      className='flex cursor-pointer select-none flex-col items-center hover:text-neutral-500'
      {...props}
    >
      {Icon && <Icon size={24} />}
      {children}
    </Component>
  )
}
