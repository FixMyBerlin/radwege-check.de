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
  <div className="my-8 -mx-5 bg-stone-100 p-4 md:mx-auto md:my-12 md:px-8 md:py-12 lg:-mx-40">
    <div className="mb-4 text-2xl">
      <strong className="font-normal">{title}</strong>
    </div>
    {children}
    {source && (
      <div className="mt-2 leading-tight text-gray-500 md:mt-6">{source}</div>
    )}
  </div>
)
