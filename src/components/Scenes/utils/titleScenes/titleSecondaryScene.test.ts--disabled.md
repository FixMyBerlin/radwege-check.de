import { SceneSecondaryProps } from '../../types'
import { titleSecondaryScene } from './titleSecondaryScene'
import { baseSceneSecondary } from './utils'

describe('titleSecondaryScene()', () => {
  describe('WIP', () => {
    it('WIP', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
      }
      const title = '[FM-C-2000]'
      expect(titleSecondaryScene(scene)).toStrictEqual(title)
    })
  })
})
