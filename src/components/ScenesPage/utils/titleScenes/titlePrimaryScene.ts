import { isDev } from '~/components/utils'
import { ScenePrimaryProps } from '../../types'
import {
  textBicycleLaneWidth,
  textBufferLeftMarking,
  textBufferLeftPhysicalProtection,
  textBufferRightMarking,
  textLeftOfBicycleLane,
  textParking,
} from './textPrimaryScene.const'
import { sceneId } from './textShared.const'
import { checkAndClean } from './utils'

type OptionalOptionProps = { includeId?: boolean } | undefined

export const titlePrimaryScene = (
  scene: Partial<ScenePrimaryProps>,
  { includeId }: OptionalOptionProps = {
    includeId: false,
  }
) => {
  const optionalSceneId = includeId && sceneId(scene)
  const debug = !process.env.DISABlE_DEBUG_FOR_JEST && isDev

  if (['shared_bus_lane', 'none'].includes(scene.bicycleLaneWidth)) {
    const textIncludeTram =
      scene.vehicleLaneUsage === 'motor_vehicle_and_tram' && 'inkl. Tram,'

    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textIncludeTram,
      textParking[scene.parking],
      optionalSceneId,
      debug && '#1',
    ])
  }

  if (['parking_lane'].includes(scene.leftOfBicycleLane)) {
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      optionalSceneId,
      debug && '#2',
    ])
  }

  if (
    // "no_cars" are the hedges on the left
    ['no_cars'].includes(scene.leftOfBicycleLane) &&
    ['none'].includes(scene.pavementWidth)
  ) {
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      'ohne KfZ- und Fußverkehr',
      optionalSceneId,
      debug && '#3a',
    ])
  }

  if (
    ['curb'].includes(scene.leftOfBicycleLane) &&
    ['none'].includes(scene.pavementWidth)
  ) {
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      'ohne Fußverkehr',
      optionalSceneId,
      debug && '#3b',
    ])
  }

  if (['curb', 'no_cars'].includes(scene.leftOfBicycleLane)) {
    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      textBufferRightMarking[scene.bufferRightMarking],
      optionalSceneId,
      debug && '#4',
    ])
  }

  if (
    ['car_lanes'].includes(scene.leftOfBicycleLane) &&
    ['hedge', 'none'].includes(scene.bufferLeftPhysicalProtection)
  ) {
    const textIncludeParking =
      scene.parking === 'parking_lane' && 'und KfZ-Parken rechts'

    return checkAndClean([
      textBicycleLaneWidth[scene.bicycleLaneWidth],
      textLeftOfBicycleLane[scene.leftOfBicycleLane],
      textBufferLeftMarking[scene.bufferLeftMarking],
      textIncludeParking,
      optionalSceneId,
      debug && '#5',
    ])
  }

  return checkAndClean([
    textBicycleLaneWidth[scene.bicycleLaneWidth],
    textLeftOfBicycleLane[scene.leftOfBicycleLane],
    textBufferLeftPhysicalProtection[scene.bufferLeftPhysicalProtection],
    optionalSceneId,
    debug && '#fallback',
  ])
}
