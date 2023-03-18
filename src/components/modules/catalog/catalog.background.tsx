import { type FC } from 'react'

interface Props {
  hide: () => void
  isHide: boolean
}

export const CatalogBackground: FC<Props> = ({ hide, isHide }) => {
  if (isHide) return null
  return (
    <div
      onClick={() => hide()}
      className={'fixed top-0 right-0 h-full w-full  bg-black opacity-30'}
    ></div>
  )
}
