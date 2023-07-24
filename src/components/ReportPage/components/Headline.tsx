import clsx from 'clsx'
import { LinkIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
  id?: string
}

export const Headline: React.FC<Props> = ({ as, children, className, id }) => {
  const h1Classes = 'sm:leading-10 text-2xl sm:text-4xl'
  const h1WrapperClasses = 'leading-10'

  const h2Classes = 'uppercase text-3xl tracking-wide mb-3 sm:mb-5'
  const h2WrapperClasses =
    'lg:-mx-20 border-b-2 border-brand-pink md:pr-20 mt-12 sm:mt-0 mb-8 sm:mb-10 inline-block'

  const h3Classes = 'text-[1.5em] leading-tight'
  const h3WrapperClasses = ''

  const Tag = as || 'h1'
  return (
    <div
      className={clsx(
        { group: id },
        className,
        as === 'h1' && h1WrapperClasses,
        as === 'h2' && h2WrapperClasses,
        as === 'h3' && h3WrapperClasses,
        'w-full sm:w-auto',
      )}
      id={id}
    >
      <Tag
        className={clsx(
          'mr-3 inline sm:inline-flex',
          className,
          as === 'h1' && h1Classes,
          as === 'h2' && h2Classes,
          as === 'h3' && h3Classes,
        )}
      >
        {children}
      </Tag>
      {id && (
        <a
          href={`#${id}`}
          className="inline-flex group-hover:opacity-100 sm:opacity-0 sm:transition-opacity"
        >
          <LinkIcon className={as === 'h1' ? 'h-6' : 'h-5'} />
        </a>
      )}
    </div>
  )
}
