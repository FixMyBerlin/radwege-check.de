import { useStore } from 'zustand'
import { titlePrimaryScene, titleSecondaryScene } from '.'
import { useStoreExperimentData } from '../../store'
import { ScenePrimaryProps, SceneSecondaryProps } from '../../types'
import { OptionalOptionProps } from './types'

export const titleScene = (
  scene: ScenePrimaryProps | SceneSecondaryProps,
  { includeId }: OptionalOptionProps = {
    includeId: false,
  }
) => {
  const { experimentTextKey } = useStore(useStoreExperimentData)

  // Guard against the initial load
  if (experimentTextKey === null) return undefined

  return experimentTextKey === 'primary'
    ? titlePrimaryScene(scene as ScenePrimaryProps, { includeId })
    : titleSecondaryScene(scene as SceneSecondaryProps, { includeId })
}
