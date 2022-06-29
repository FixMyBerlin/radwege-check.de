import classNames from 'classnames'
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
      className={classNames(
        'flex flex-col gap-2 md:flex-row md:items-center',
        !isWeightGraph && '-mr-2'
      )}
    >
      <div
        className={classNames(
          titleClass,
          isWeightGraph
            ? 'flex min-h-[60px] w-52 items-center lg:w-64'
            : 'my-8 w-20 lg:w-40',
          'silbentrennung mr-1 leading-5'
        )}
      >
        <strong>{title}</strong>
      </div>
      <div className="flex flex-1 grow items-center justify-center">
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
        <div className="relative">
          <FeelSafe value={feelsafe} icon={feelsafeIcon} />
        </div>
      )}
    </div>
  )
}
