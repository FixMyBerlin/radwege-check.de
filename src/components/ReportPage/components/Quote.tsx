import clsx from 'clsx'
import React from 'react'

type Props = {
  sourceText?: string | React.ReactNode
  children: React.ReactNode
}

export const Quote: React.FC<Props> = ({ sourceText, children }) => {
  return (
    <section className="relative mx-auto mb-20 mt-6 flex max-w-lg flex-col">
      <div
        className={clsx(
          'rounded bg-white px-8 py-6 text-xl font-semibold leading-normal shadow-2xl sm:text-2xl',
          sourceText && 'pb-10'
        )}
      >
        <blockquote className="m-0 border-0 p-0">{children}</blockquote>
        {sourceText && (
          <div className="-mb-[3.75rem] mt-4 flex items-center justify-center">
            <div className="inline-flex rounded bg-brand-pink px-6 py-3 text-center text-sm font-bold leading-normal text-white">
              {sourceText}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
