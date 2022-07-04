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
  return experimentTextKey === 'primary'
    ? titlePrimaryScene(scene as ScenePrimaryProps, { includeId })
    : titleSecondaryScene(scene as SceneSecondaryProps, { includeId })
}
