import { isDev } from '~/components/utils'
import { SceneSecondaryProps } from '../../types'
import {
  textBicycleStreetType,
  textCarriagewayDirection,
  textNoCarsAndBicycleStreetType,
  textParkingCategory,
} from './textSecondaryScene.const'
import { sceneId } from './textShared.const'
import { OptionalOptionProps } from './types'
import { checkAndClean } from './utils'

export type TitleSecondaryScene = Partial<SceneSecondaryProps> &
  SceneSecondaryProps['sceneId'] &
  SceneSecondaryProps['bicycleStreetType'] &
  SceneSecondaryProps['motorVehicleTrafficVolumen'] &
  SceneSecondaryProps['carriagewayDirection'] &
  SceneSecondaryProps['parkingCategory']

export const titleSecondaryScene = (
  scene: TitleSecondaryScene,
  { includeId }: OptionalOptionProps = {
    includeId: false,
  },
) => {
  const optionalSceneId = includeId ? sceneId(scene) : ''
  const debug = !process.env.DISABlE_DEBUG_FOR_JEST && isDev

  if (
    ['no_cars'].includes(scene.motorVehicleTrafficVolumen) &&
    ['no_parking'].includes(scene.parkingCategory)
  ) {
    return checkAndClean([
      textNoCarsAndBicycleStreetType[scene.bicycleStreetType],
      optionalSceneId,
      debug && '#1',
    ])
  }

  if (['no_cars'].includes(scene.motorVehicleTrafficVolumen)) {
    return checkAndClean([
      textBicycleStreetType[scene.bicycleStreetType],
      textParkingCategory[scene.parkingCategory],
      optionalSceneId,
      debug && '#2',
    ])
  }

  return checkAndClean([
    textBicycleStreetType[scene.bicycleStreetType],
    'mit Mischverkehr',
    textCarriagewayDirection[scene.carriagewayDirection],
    optionalSceneId,
    debug && '#fallback',
  ])
}
