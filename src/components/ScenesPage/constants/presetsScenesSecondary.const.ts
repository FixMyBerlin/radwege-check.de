import { PresetsScenes } from './types'

export const presetsScenesSecondary: PresetsScenes = {
  noCars: {
    title: 'Nebenstraßen "autofrei"',
    sceneIdForImage: 'SE_C_10',
    resultTotal: 18,
    averageScore: 77,
    searchFilterString:
      'bicycleStreetType:markings_bike_icon_dooring_zone,none,bicycle_road,living_street,green_surface%7CmotorVehicleTrafficVolumen:no_cars',
  },
  bikeStreetWithCars: {
    title: 'Fahhradstraßen (inkl. Sondermarkierungen) mit Kfz-Verkehr',
    sceneIdForImage: 'SE_C_17',
    resultTotal: 18,
    averageScore: 38,
    searchFilterString:
      'bicycleStreetType:markings_bike_icon_dooring_zone,bicycle_road,green_surface%7CcarriagewayWidth:wide%7CmotorVehicleTrafficVolumen:low_traffic_volumen',
  },
  bikeStreetNoCars: {
    title: 'Fahhradstraßen (inkl. Sondermarkierungen) "autofrei"',
    sceneIdForImage: 'SE_C_10',
    resultTotal: 9,
    averageScore: 82,
    searchFilterString:
      'bicycleStreetType:markings_bike_icon_dooring_zone,bicycle_road,green_surface%7CcarriagewayWidth:wide%7CmotorVehicleTrafficVolumen:no_cars',
  },
  noParkingButCars: {
    title: 'Nebenstraßen ohne Parken mit Kfz-Verkehr',
    sceneIdForImage: 'SE_C_12', // not the top result since that is used for the next preset
    resultTotal: 20,
    averageScore: 38,
    searchFilterString:
      'bicycleStreetType:markings_bike_icon_dooring_zone,bicycle_road,green_surface,none,living_street%7CmotorVehicleTrafficVolumen:low_traffic_volumen%7CparkingCategory:no_parking',
  },
  onWay: {
    title: 'Ein­bahn­straße Fahrrad frei (Kfz-Gegenverkehr)',
    sceneIdForImage: 'SE_C_17',
    resultTotal: 24,
    averageScore: 27,
    searchFilterString:
      'bicycleStreetType:markings_bike_icon_dooring_zone,bicycle_road,green_surface,none,living_street%7CcarriagewayDirection:one_way_for_cars_only',
  },
}
