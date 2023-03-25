import { type FC } from 'react'
import * as ImageNext from 'next/image'
type Props = Omit<ImageNext.ImageProps, 'src'> & {
  src?: string | null
}
export const Image: FC<Props> = ({ src, priority = true, ...props }) => {
  const source = src
    ? `${process.env.NEXT_PUBLIC_STATIC_URL}/${src}`
    : '/image_placeholder.jpg'
  return <ImageNext.default priority={priority} src={source} {...props} />
}
