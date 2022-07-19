import { SceneSecondaryProps } from '../../types'
import { titleSecondaryScene } from './titleSecondaryScene'
import { baseSceneSecondary } from './utils'

// See src/components/utils/matomo/types.d.ts
declare global {
  interface Window {
    _paq: any[]
    dev: boolean
  }
}

describe('titleSecondaryScene()', () => {
  describe('no_cars, no_parking', () => {
    it('works', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'none',
        motorVehicleTrafficVolumen: 'no_cars',
        parkingCategory: 'no_parking',
      }
      const title = 'Radverkehrsführung in autofreier Nebenstraße [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })

  describe('no_cars, but parking', () => {
    it('works', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'none',
        motorVehicleTrafficVolumen: 'no_cars',
        parkingCategory: 'parking_one_side',
      }
      const title =
        'Radverkehrsführung in Nebenstraße mit Parken rechts [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })

  describe('bicycleStreetType: "none"', () => {
    it('few cars, both directions, parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'none',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'both_directions',
        parkingCategory: 'parking_both_sides',
      }
      const title =
        'Radverkehrsführung in Nebenstraße mit Mischverkehr in beiden Richtungen [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })

    it('few cars, one direction, less parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'none',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'one_way',
        parkingCategory: 'parking_one_side',
      }
      const title =
        'Radverkehrsführung in Nebenstraße mit Mischverkehr auf Einbahnstraße in Fahrtrichtung [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })

  describe('bicycleStreetType: "bicycle_road"', () => {
    it('few cars, both directions, parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'bicycle_road',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'both_directions',
        parkingCategory: 'parking_both_sides',
      }
      const title =
        'Radverkehrsführung auf Fahrradstraße mit Mischverkehr in beiden Richtungen [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })

  describe('bicycleStreetType: "markings_bike_icon_dooring_zone"', () => {
    it('few cars, both directions, parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'markings_bike_icon_dooring_zone',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'one_way_for_cars_only',
        parkingCategory: 'parking_one_side',
      }
      const title =
        'Radverkehrsführung auf Fahrradstraße (Sondermarkierung) mit Mischverkehr auf gegenläufiger Einbahnstraße [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })

    it('few cars, one directions, no parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'markings_bike_icon_dooring_zone',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'one_way',
        parkingCategory: 'no_parking',
      }
      const title =
        'Radverkehrsführung auf Fahrradstraße (Sondermarkierung) mit Mischverkehr auf Einbahnstraße in Fahrtrichtung [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })

  describe('bicycleStreetType: "green_surface"', () => {
    it('few cars, both directions, parking', () => {
      const scene: Partial<SceneSecondaryProps> = {
        ...baseSceneSecondary,
        bicycleStreetType: 'green_surface',
        motorVehicleTrafficVolumen: 'low_traffic_volumen',
        carriagewayDirection: 'both_directions',
        parkingCategory: 'parking_both_sides',
      }
      const title =
        'Radverkehrsführung auf Fahrradstraße mit grüner Oberfläche mit Mischverkehr in beiden Richtungen [FM-C-3000]'
      expect(titleSecondaryScene(scene, { includeId: true })).toStrictEqual(
        title
      )
    })
  })
})
