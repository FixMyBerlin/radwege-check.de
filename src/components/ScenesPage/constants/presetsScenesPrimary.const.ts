import { PresetsScenes } from './types'

export const presetsScenesPrimary: PresetsScenes = {
  wideBollard: {
    title: 'Breitere Radstreifen mit Pollern auf Fahrbahn',
    sceneIdForImage: 'MS_C_573',
    resultTotal: 80,
    averageScore: 95,
    searchFilterString:
      'bicycleLaneWidth:wide|bufferHasPhysicalProtection:true|leftOfBicycleLane:car_lanes',
  },
  sidewalkShops: {
    title: 'Radwege im Seitenraum mit Geschäften und schmalen Gehwegen',
    sceneIdForImage: 'CP_C_837',
    resultTotal: 180,
    averageScore: 76,
    searchFilterString:
      'leftOfBicycleLane:car_lanes,curb|pavementHasShops:true|pavementWidth:narrow',
  },
  narrowParkingRight: {
    title: 'Schmalere Radstreifen mit Kfz-Parken rechts',
    sceneIdForImage: 'MS_C_871',
    resultTotal: 128,
    averageScore: 42,
    searchFilterString:
      'bicycleLaneWidth:narrow|leftOfBicycleLane:car_lanes|parking:parking_lane',
  },
  rightOfParking: {
    title: 'Radführung rechts von Kfz-Parken',
    sceneIdForImage: 'MS_C_606',
    resultTotal: 16,
    averageScore: 93,
    searchFilterString: 'leftOfBicycleLane:parking_lane',
  },
  sidewalkNarrowBuffer: {
    title: 'Radwege im Seitenraum ohne Geschäfte (Trennung links schmal)',
    sceneIdForImage: 'CP_C_1289',
    resultTotal: 90,
    averageScore: 90,
    searchFilterString:
      'bicycleLaneWidth:narrow,none,shared_bus_lane,wide|bufferLeftWidth:narrow|bufferRightWidth:narrow|leftOfBicycleLane:curb|pavementHasShops:false|pavementWidth:narrow',
  },
  mixedTrafficBus: {
    title: 'Führung im Mischverkehr (inkl. Busspur)',
    sceneIdForImage: 'MS_C_1336',
    resultTotal: 18,
    averageScore: 19,
    searchFilterString: 'bicycleLaneWidth:none,shared_bus_lane',
  },
}
