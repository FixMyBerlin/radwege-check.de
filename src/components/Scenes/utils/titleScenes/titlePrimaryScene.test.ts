import { ScenePrimaryProps } from '../../types'
import { titlePrimaryScene } from './titlePrimaryScene'
import { baseScenePrimary } from './utils'

describe('titlePrimaryScene()', () => {
  describe('shared lanes (Bus, Mischverkehr)', () => {
    it('… with parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'shared_bus_lane',
        parking: 'parking_lane',
      }
      const title = 'Radverkehrsführung auf Busspur mit KfZ-Parken [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('… no parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'shared_bus_lane',
        parking: 'no_parking',
      }
      const title = 'Radverkehrsführung auf Busspur ohne KfZ-Parken [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('leftOfBicycleLane: green', () => {
    it('for `wide`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'green',
      }
      const title = 'Breite (3,5 m) Radverkehrsanlage in Grünanlage [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('for `narrow`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'green',
      }
      const title = 'Schmale (2 m) Radverkehrsanlage in Grünanlage [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('leftOfBicycleLane: parking_lane', () => {
    it('for `wide`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'parking_lane',
      }
      const title =
        'Breite (3,5 m) Radverkehrsanlage rechts von parkenden Autos [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('for `narrow`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'parking_lane',
      }
      const title =
        'Schmale (2 m) Radverkehrsanlage rechts von parkenden Autos [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('leftOfBicycleLane: curb', () => {
    it('bufferRightMarking: double_line (same for all other except `none`)', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'curb',
        bufferRightMarking: 'double_line',
      }
      const title =
        'Breite (3,5 m) Radverkehrsanlage im Seitenraum mit Trennung zum Fußverkehr durch Doppellinie [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferRightMarking: none', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'curb',
        bufferRightMarking: 'none',
      }
      const title =
        'Schmale (2 m) Radverkehrsanlage im Seitenraum ohne Trennung zum Fußverkehr [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('leftOfBicycleLane: car_lanes', () => {
    it('bufferLeftPhysicalProtection: bollard_high (same for all other except `none`)', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'bollard_high',
      }
      const title =
        'Breite (3,5 m) Radverkehrsanlage auf der Fahrbahn mit Schutz durch Poller (hoch) [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferLeftPhysicalProtection: none', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'none',
      }
      const title =
        'Schmale (2 m) Radverkehrsanlage auf der Fahrbahn ohne Trennung links [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('bufferLeftPhysicalProtection: green — whichs shows bufferLeftMarking', () => {
    it('bufferLeftPhysicalProtection: solid_line (same for all other except `none`)', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'green',
        bufferLeftMarking: 'solid_line',
      }
      const title =
        'Schmale (2 m) Radverkehrsanlage auf der Fahrbahn mit durchgezogener Linie links [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferLeftPhysicalProtection: none', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'green',
        bufferLeftMarking: 'none',
      }
      const title =
        'Schmale (2 m) Radverkehrsanlage auf der Fahrbahn ohne Trennung links [FM-C-2000]'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })
})
