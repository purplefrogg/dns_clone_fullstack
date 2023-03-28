import Link from 'next/link'
import React, {
  type JSXElementConstructor,
  type AnchorHTMLAttributes,
  type FC,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { type IconType } from 'react-icons'
import { cn } from '~/utils/cn'

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
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'flex cursor-pointer select-none flex-col items-center hover:text-orange-400/80',
        className
      )}
      {...props}
    >
      {Icon && <Icon size={24} />}
      {children}
    </Component>
  )
}
