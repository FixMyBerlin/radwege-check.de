import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FeelSafe, FeelsafeIcon } from '../FeelSafe'
import { BarElement } from './BarElement'

type ScaleChartProps = {
  titleClass?: string
  title: string
  data: [number, number, number, number]
  feelsafe?: number
  feelsafeIcon?: FeelsafeIcon
}

type WeightChartProps = {
  titleClass?: string
  title: string
  data: [number]
  feelsafe?: never
  feelsafeIcon?: never
}

type BarChartProps = WeightChartProps | ScaleChartProps

export const BarChart = ({
  titleClass,
  title,
  data,
  feelsafe,
  feelsafeIcon,
}: BarChartProps) => {
  const [isWeightGraph, setWeightGraph] = useState(data.length === 1)
  useEffect(() => setWeightGraph(data.length === 1), [data.length])

  // For some reason the FeelSafe has a paddging, which we compensate with a smaller gap and -mr-2
  return (
    <div
      className={clsx(
        'flex flex-col gap-2 sm:flex-row sm:items-center',
        !isWeightGraph && 'sm:-mr-2',
      )}
    >
      <div
        className={clsx(
          titleClass,
          isWeightGraph
            ? 'mt-3 flex sm:mt-auto sm:min-h-[60px] sm:w-52 sm:items-center lg:w-64'
            : 'my-3 sm:my-8 sm:w-20 lg:w-40',
          'silbentrennung leading-5 sm:mr-1',
        )}
      >
        <strong>{title}</strong>
      </div>
      <div className="flex w-full flex-1 grow justify-center sm:w-auto sm:items-center">
        <div className="flex h-[40px] w-full text-sm md:text-base">
          {data.map((d, i) => (
            <BarElement
              title={title}
              value={d}
              index={i}
              isWeightGraph={isWeightGraph}
              // this index is stable
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            />
          ))}
        </div>
      </div>
      {!isWeightGraph && (
        <div className="relative place-self-center sm:place-self-auto">
          <FeelSafe value={feelsafe} icon={feelsafeIcon} />
        </div>
      )}
    </div>
  )
}
