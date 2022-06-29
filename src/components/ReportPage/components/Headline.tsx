import classNames from 'classnames'
import { LinkIcon } from '@heroicons/react/solid'
import React from 'react'

type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
  id?: string
}

export const Headline: React.FC<Props> = ({ as, children, className, id }) => {
  const h1Classes = 'leading-10'
  const h1WrapperClasses = 'leading-10'
  const h2Classes = 'uppercase text-3xl tracking-wide mb-5'
  const h2WrapperClasses =
    'lg:-mx-20 border-b-2 border-brand-pink pr-20 mb-12 inline-block'
  const h3Classes = 'text-[1.5em]'
  const h3WrapperClasses = ''

  const Tag = as || 'h1'
  return (
    <div
      className={classNames(
        { group: id },
        className,
        as === 'h1' && h1WrapperClasses,
        as === 'h2' && h2WrapperClasses,
        as === 'h3' && h3WrapperClasses
      )}
      id={id}
    >
      <Tag
        className={classNames(
          'mr-3 inline-flex',
          className,
          as === 'h1' && h1Classes,
          as === 'h2' && h2Classes,
          as === 'h3' && h3Classes
        )}
      >
        {children}
      </Tag>
      {id && (
        <a
          href={`#${id}`}
          className="inline-flex opacity-0 transition-opacity group-hover:opacity-100"
        >
          <LinkIcon className={as === 'h1' ? 'h-6' : 'h-5'} />
        </a>
      )}
    </div>
  )
}
