import React from 'react'
import { formatPercent } from '~/components/utils'
import { ScenePrimaryProps } from '../../../types'
import { barColor, barTitle } from '../utils'

const keys = [
  'vote0Unsafe',
  'vote1RatherUnsafe',
  'vote2Save',
  'vote3VerySave',
] as const

type Props = Pick<
  ScenePrimaryProps,
  'vote0Unsafe' | 'vote1RatherUnsafe' | 'vote2Save' | 'vote3VerySave'
>

export const BarChart: React.FC<Props> = ({
  vote0Unsafe,
  vote1RatherUnsafe,
  vote2Save,
  vote3VerySave,
}) => {
  const voteValues = {
    vote0Unsafe,
    vote1RatherUnsafe,
    vote2Save,
    vote3VerySave,
  }
  // We need to sum, otherwise a vote of 0 will break the chart.
  // We only want to guard against empty charts.
  if (!(vote0Unsafe + vote1RatherUnsafe + vote2Save + vote3VerySave))
    return null

  return (
    <div className="flex h-full w-full flex-col">
      {keys.map((key) => (
        <div
          key={key}
          title={`${barTitle[key]}: ${formatPercent(voteValues[key], {})}`}
          style={{
            height: `${voteValues[key]}%`,
            backgroundColor: barColor[key],
          }}
          className="w-full"
        >
          {' '}
        </div>
      ))}
    </div>
  )
}
