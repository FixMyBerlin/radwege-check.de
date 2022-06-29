import { useStore } from 'zustand'
import { titlePrimaryScene, titleSecondaryScene } from '..'
import { useStoreExperimentData } from '../../../store'

export const useTitleScene = () => {
  const { experimentTextKey } = useStore(useStoreExperimentData)
  const titleScene =
    experimentTextKey === 'primary' ? titlePrimaryScene : titleSecondaryScene

  return titleScene
}
