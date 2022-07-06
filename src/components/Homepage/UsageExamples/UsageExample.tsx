import React from 'react'

type Props = {
  image: React.ReactNode
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const UsageExample: React.FC<Props> = ({
  image,
  title,
  icon,
  children,
}) => {
  return (
    <section className="flex w-full flex-col overflow-hidden border border-neutral-300 lg:flex-row lg:rounded-lg lg:border-neutral-100 lg:shadow-xl">
      <div className="flex-none lg:w-1/2 lg:pr-3">{image}</div>
      <div className="flex flex-col p-4 pt-0 lg:pt-4">
        <div className="mb-2 flex flex-row items-center justify-between gap-5">
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          {icon}
        </div>
        <p>{children}</p>
      </div>
    </section>
  )
}
