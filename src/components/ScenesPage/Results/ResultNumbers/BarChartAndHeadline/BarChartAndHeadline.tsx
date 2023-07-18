import clsx from 'clsx'
import React from 'react'
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
} from '~/components/ScenesPage/types'
import { formatNumber } from '~/components/utils'
import { BarChart } from './BarChart'

type Props = {
  /* @desc The `bicycle` Chart is our main Chart, others are smaller but have interaction. */
  mainBarChart?: boolean
  icon: React.ReactElement
  handleMouseOver?: () => void
  handleMouseOut?: () => void
} & (
  | Pick<
      ScenePrimaryProps,
      | 'voteScore'
      | 'vote0Unsafe'
      | 'vote1RatherUnsafe'
      | 'vote2Save'
      | 'vote3VerySave'
    >
  | Pick<
      SceneSecondaryProps,
      | 'voteScore'
      | 'vote0Unsafe'
      | 'vote1RatherUnsafe'
      | 'vote2Save'
      | 'vote3VerySave'
    >
)

export const BarChartAndHeadline: React.FC<Props> = ({
  mainBarChart,
  icon,
  voteScore,
  vote0Unsafe,
  vote1RatherUnsafe,
  vote2Save,
  vote3VerySave,
  handleMouseOver,
  handleMouseOut,
}) => {
  if (!voteScore) return null

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={clsx(
        'flex h-full flex-col items-center justify-center',
        mainBarChart ? 'flex-1' : 'w-14',
        { 'cursor-pointer': !!handleMouseOver },
      )}
    >
      <div className="flex h-8 flex-none items-center justify-center">
        {icon}
        <strong
          className={clsx(
            'whitespace-nowrap font-semi tracking-tight',
            mainBarChart ? 'text-2xl font-semibold' : 'text-lg font-medium',
          )}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: formatNumber(voteScore, {
              precision: 0,
              unit: '&hairsp;%',
            }),
          }}
        />
      </div>
      <BarChart
        vote0Unsafe={vote0Unsafe}
        vote1RatherUnsafe={vote1RatherUnsafe}
        vote2Save={vote2Save}
        vote3VerySave={vote3VerySave}
      />
    </div>
  )
}
