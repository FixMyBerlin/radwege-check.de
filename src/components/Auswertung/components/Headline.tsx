import classNames from 'classnames'
import React from 'react'

type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  toc?: any // TODO
  tocAnchor?: any // TODO
}

export const Headline: React.FC<Props> = ({ as, children, toc, tocAnchor }) => {
  console.log({ NOTE: { toc, tocAnchor }, msg: '…are ignored ATM.' }) // TODO

  const h1Classes = 'border-b-2'
  const h2Classes = 'border-b-2'
  const h3Classes = 'mt-10 text-3xl font-semibold'

  const Tag = 'h1' || as
  return (
    <Tag
      className={classNames(
        as === 'h1' && h1Classes,
        as === 'h2' && h2Classes,
        as === 'h3' && h3Classes
      )}
    >
      {children}
    </Tag>
  )
}
