import React from 'react'
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
} from '~/components/ScenesPage/types'
import { formatPercent } from '~/components/utils'

type Props = {
  visible: boolean
  scene: ScenePrimaryProps | SceneSecondaryProps
}

export const ScoreExplanation: React.FC<Props> = ({ visible, scene }) => {
  if (!visible) return null

  return (
    <p className="mb-2 font-semi text-xs leading-tight">
      Der Score (
      {[
        formatPercent(scene.voteScore, { precision: 0 }),
        formatPercent(scene.votePedestrianScore, { precision: 0 }),
        formatPercent(scene.voteCarScore, { precision: 0 }),
      ]
        .filter(Boolean)
        .join(', ')}
      ) entspricht der Summe „eher sicher“ und „sicher“ der jeweiligen
      Perspektive.
    </p>
  )
}
