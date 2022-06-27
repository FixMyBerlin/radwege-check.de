import { ScenePrimaryProps } from '../../types'
import { checkAndClean } from './utils'
import {
  textBicycleLaneWidth,
  textBufferLeftMarking,
  textBufferLeftPhysicalProtection,
  textBufferRightMarking,
  textLeftOfBicycleLane,
  textParking,
} from './textPrimaryScene.const'
import { sceneId } from './textShared.const'

export const titleSecondaryScene = (scene: Partial<ScenePrimaryProps>) => {
  if (['shared_bus_lane', 'none'].includes(scene.bicycleLaneWidth))
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textParking[scene.parking],
      sceneId(scene),
    ])

  if (['parking_lane', 'green'].includes(scene.leftOfBicycleLane))
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      sceneId(scene),
    ])

  if (['curb'].includes(scene.leftOfBicycleLane))
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      textBufferRightMarking[scene.bufferRightMarking],
      sceneId(scene),
    ])

  if (
    ['car_lanes'].includes(scene.leftOfBicycleLane) &&
    ['green'].includes(scene.bufferLeftPhysicalProtection)
  )
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      textBufferLeftMarking[scene.bufferLeftMarking],
      sceneId(scene),
    ])

  return checkAndClean([
    textBicycleLaneWidth[scene.bicycleLaneWidth],
    textLeftOfBicycleLane[scene.leftOfBicycleLane],
    textBufferLeftPhysicalProtection[scene.bufferLeftPhysicalProtection],
    sceneId(scene),
  ])
}
