import {
  ScenePrimaryProps,
  SceneSecondaryProps,
} from '~/components/ScenesPage/types'

export const laneWidthCalculationText = (
  scene: ScenePrimaryProps | SceneSecondaryProps,
) => {
  if (!('bicycleLaneWidthWithoutBufferAndDooringZoneNumber' in scene))
    return null

  const base = `${Number(
    scene.bicycleLaneWidthNumber,
  ).toLocaleString()} m Gesamtbreite`

  const left = `abzüglich ${Number(
    scene.bufferLeftWidthNumber,
  ).toLocaleString()} m Markierung Links`

  let right
  if (scene.bufferRightDooringZoneNumber === scene.bufferRightWidthNumber) {
    right = `abzüglich ${Number(
      scene.bufferRightWidthNumber,
    ).toLocaleString()} m Markierung Rechts (entspricht Schutzraum Dooring Zone)`
  } else if (scene.bufferRightDooringZoneNumber) {
    right = [
      `(statt der Markierung Rechts von ${Number(
        scene.bufferRightWidthNumber,
      ).toLocaleString()} m berücksichtigen wir die Dooring Zone)`,
      `abzüglich ${Number(
        scene.bufferRightDooringZoneNumber,
      ).toLocaleString()} m Dooring Zone Rechts`,
    ]
  } else {
    right = `abzüglich ${Number(
      scene.bufferRightWidthNumber,
    ).toLocaleString()} m Markierung Rechts`
  }

  const sum = `= ${scene.bicycleLaneWidthWithoutBufferAndDooringZoneNumber} nutzbare Breite`

  return [base, left, right, sum].flat().join('\n')
}
