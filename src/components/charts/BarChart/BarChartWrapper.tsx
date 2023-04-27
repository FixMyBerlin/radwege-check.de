import React from 'react'

type Props = {
  title: string
  source?: string
  children: React.ReactNode
}

export const BarChartWrapper: React.FC<Props> = ({
  title,
  source,
  children,
}) => (
  <div className="-mx-3 my-8 bg-stone-100 p-4 sm:mx-auto md:-mx-12  md:my-12 md:px-8 md:py-12 lg:-mx-40">
    <div className="mb-4 text-2xl">
      <strong className="font-normal">{title}</strong>
    </div>
    {children}
    {source && (
      <div className="mt-2 leading-tight text-gray-500 md:mt-6">{source}</div>
    )}
  </div>
)
