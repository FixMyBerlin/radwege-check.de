import { ScenePrimaryProps } from '../../types'
import { titlePrimaryScene } from './titlePrimaryScene'
import { baseScenePrimary } from './utils'

describe('titlePrimaryScene()', () => {
  it('appends the SceneID with `{ includeId: true }`', () => {
    const scene: Partial<ScenePrimaryProps> = {
      ...baseScenePrimary,
      bicycleLaneWidth: 'shared_bus_lane',
      parking: 'parking_lane',
    }
    const title = 'Radverkehrsführung auf Busspur mit Kfz-Parken [FM-C-2000]'
    expect(titlePrimaryScene(scene, { includeId: true })).toStrictEqual(title)
  })

  describe('shared lanes (Bus, Mischverkehr)', () => {
    it('… with parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'shared_bus_lane',
        parking: 'parking_lane',
      }
      const title = 'Radverkehrsführung auf Busspur mit Kfz-Parken'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('… no parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'shared_bus_lane',
        parking: 'no_parking',
      }
      const title = 'Radverkehrsführung auf Busspur ohne Kfz-Parken'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('… for the special case of Tram', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'none',
        vehicleLaneUsage: 'motor_vehicle_and_tram',
        parking: 'no_parking',
      }
      const title =
        'Radverkehrsführung im Mischverkehr inkl. Tram, ohne Kfz-Parken'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('leftOfBicycleLane: no_cars', () => {
    it('for `wide`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'no_cars',
        bufferRightMarking: 'grass_verge',
      }
      const title =
        'Breite Radverkehrsanlage (3,5 m) ohne Kfz-Verkehr und mit Trennung zum Fußverkehr durch Grünstreifen'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('for `narrow`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'no_cars',
        bufferRightMarking: 'none',
      }
      const title =
        'Schmale Radverkehrsanlage (2 m) ohne Kfz-Verkehr und ohne Trennung zum Fußverkehr'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('no cars, no pedestirans', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'wide',
        leftOfBicycleLane: 'no_cars',
        pavementWidth: 'none',
      }
      const title = 'Breite Radverkehrsanlage (3,5 m) ohne Kfz- und Fußverkehr'
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
        'Breite Radverkehrsanlage (3,5 m) rechts von parkenden Autos'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('for `narrow`', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'parking_lane',
      }
      const title = 'Schmale Radverkehrsanlage (2 m) rechts von parkenden Autos'
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
        'Breite Radverkehrsanlage (3,5 m) im Seitenraum mit Trennung zum Fußverkehr durch Doppellinie'
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
        'Schmale Radverkehrsanlage (2 m) im Seitenraum ohne Trennung zum Fußverkehr'
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
        'Breite Radverkehrsanlage (3,5 m) auf der Fahrbahn geschützt durch hohe Poller'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferLeftPhysicalProtection: none', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'none',
        bufferLeftMarking: 'dashed_line',
        parking: 'no_parking',
      }
      const title =
        'Schmale Radverkehrsanlage (2 m) auf der Fahrbahn mit unterbrochem Breitstrich links'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })

  describe('bufferLeftPhysicalProtection: hedge — whichs shows bufferLeftMarking', () => {
    it('bufferLeftPhysicalProtection: solid_line (same for all other except `none`) and parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'hedge',
        bufferLeftMarking: 'solid_line',
        parking: 'parking_lane',
      }
      const title =
        'Schmale Radverkehrsanlage (2 m) auf der Fahrbahn mit durchgezogenem Breitstrich links und Kfz-Parken rechts'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferLeftPhysicalProtection: solid_line (same for all other except `none`) without parking', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'hedge',
        bufferLeftMarking: 'solid_line',
        parking: 'no_parking', // which means we do not add any extra string here
      }
      const title =
        'Schmale Radverkehrsanlage (2 m) auf der Fahrbahn mit durchgezogenem Breitstrich links'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })

    it('bufferLeftPhysicalProtection: none', () => {
      const scene: Partial<ScenePrimaryProps> = {
        ...baseScenePrimary,
        bicycleLaneWidth: 'narrow',
        leftOfBicycleLane: 'car_lanes',
        bufferLeftPhysicalProtection: 'hedge',
        bufferLeftMarking: 'none',
        parking: 'no_parking',
      }
      const title =
        'Schmale Radverkehrsanlage (2 m) auf der Fahrbahn ohne Trennung links'
      expect(titlePrimaryScene(scene)).toStrictEqual(title)
    })
  })
})
