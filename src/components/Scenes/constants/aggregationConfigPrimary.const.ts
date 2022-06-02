// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

import { AggregationConfig } from './types'

export const aggregationConfigPrimary: AggregationConfig = {
  leftOfBicycleLane: {
    title: 'Führung des Radverkehrs',
    buckets: {
      car_lanes: 'Fahr&shy;bahn',
      parking_lane: 'Rechts v. Parken',
      curb: 'Seiten&shy;raum',
      green: 'Grün&shy;anlage',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
  bicycleLaneWidth: {
    title: 'Radverkehrsanlage (RVA)',
    resultTitle: 'Radverkehrsanlage',
    buckets: {
      wide: 'Breit<br />(3,5&thinsp;m)',
      narrow: 'Schmal<br />(2&thinsp;m)',
      shared_bus_lane: 'Busspur Fahrrad frei',
      none: 'Keine RVA',
    },
    resultBuckets: {
      wide: 'Breite RVA',
      narrow: 'Schmale RVA',
      shared_bus_lane: 'Busspur mit Fahrrad frei',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
  parking: {
    title: 'KfZ-Parken vorhanden',
    resultTitle: 'KfZ-Parken',
    buckets: {
      noChoice: 'Egal',
      parking_lane: 'Ja',
      no_parking: 'Nein',
    },
    resultBuckets: {
      parking_lane: 'Mit Parkspur',
      no_parking: 'Ohne Parkspur',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
    primaryGroup: true,
  },
  bicycleLaneSurface: {
    title: 'Oberfläche RVA',
    buckets: {
      noChoice: 'Egal',
      surface_asphalt: 'Asphalt',
      surface_green: 'Grün&shy;markierung',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferHasPhysicalProtection: {
    title: 'Bauliche Trennung Links RVA',
    resultTitle: 'Bauliche Trennung Links',
    buckets: {
      noChoice: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferLeftPhysicalProtection: {
    title: 'Einzelne bauliche Trennung auswählen',
    resultTitle: 'Art der baul. Trennung Links',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      planter: 'Blumenkästen',
      green: 'Grünanlage',
    },
    choiceMode: 'single',
    showAsIcons: true,
    groupEndIndicator: true,
  },
  bufferLeftWidth: {
    title: 'Markierung Links RVA',
    resultTitle: 'Markierung Links',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      none: 'Keine',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferLeftMarking: {
    title: 'Einzelne Markierungsart auswählen',
    resultTitle: 'Art der Markierung Links',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      dashed_line: 'Unterbrochen Linie',
      solid_line: 'Durchgezogene Linie',
      double_line: 'Doppellinie',
      restricted_area: 'Sperrzone',
      paved_verge: 'Aufpflasterung',
      grass_verge: 'Grünstreifen',
    },
    choiceMode: 'single',
    showAsIcons: true,
  },
  bufferRightWidth: {
    title: 'Markierung Rechts RVA',
    resultTitle: 'Markierung Rechts',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      none: 'Keine',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferRightMarking: {
    title: 'Einzelne Markierungsart auswählen',
    resultTitle: 'Art der Markierung Rechts',
    buckets: {
      noChoice: 'Egal',
      none: 'Keine',
      solid_line: 'Durchgezogene Linie',
      double_line: 'Doppellinie',
      restricted_area: 'Sperrzone',
      paved_verge: 'Aufpflasterung',
      grass_verge: 'Grünstreifen',
    },
    choiceMode: 'single',
    showAsIcons: true,
    groupEndIndicator: true,
  },
  vehicleTrafficVolume: {
    title: 'KfZ-Verkehrsaufkommen',
    buckets: {
      noChoice: 'Egal',
      low_traffic_volumen: 'Niedrig',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch (mit LKW)',
    },
    resultBuckets: {
      low_traffic_volumen: 'Niedrig (ohne Schwerlastverkehr)',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch (mit Schwerlastverkehr)',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneMaxspeed: {
    title: 'Tempolimit',
    buckets: {
      noChoice: 'Egal',
      '30': '30 km/h',
      '50': 'Keins',
    },
    resultBuckets: {
      '50': 'Kein Limit (50 km/h)',
    },
    sortOrder: ['noChoice', '30', '50'],
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrstreifen Nutzung',
    resultTitle: 'Nutzung der Fahrstreifen',
    buckets: {
      noChoice: 'Egal',
      motor_vehicle_and_tram: 'Mit Tram',
      motor_vehicle_only: '1 Fahr&shy;streifen',
      motor_vehicle_only_one_way: '1 Fahr&shy;streifen',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
  },
  pavementWidth: {
    title: 'Gehweg',
    resultTitle: 'Gehwegbreite',
    buckets: {
      noChoice: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  pavementHasShops: {
    title: 'Geschäfte / Cafétische',
    buckets: {
      noChoice: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    resultBuckets: {
      true: 'Ja (mit Tischen, Auslage)',
      false: 'Nein (reiner Gehweg)',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
}
