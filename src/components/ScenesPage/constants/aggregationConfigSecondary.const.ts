// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

import { AggregationConfig } from './types'

export const aggregationConfigSecondary: AggregationConfig = {
  bicycleStreetType: {
    title: 'Auszeichnung der Straße',
    buckets: {
      none: 'Keine',
      bicycle_road: 'Fahrradstraße',
      green_surface: 'Grünbeschichtung',
      markings_bike_icon_dooring_zone: 'Straßenmarkierung',
      living_street: 'Verkehrsberuhigter Bereich',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
  parkingCategory: {
    title: 'Parken',
    buckets: {
      noChoice: 'Egal',
      no_parking: 'Park&shy;verbot',
      parking_one_side: 'Rechte Seite',
      parking_both_sides: 'Beide Seiten',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  carriagewayDirection: {
    title: 'Freigabe Fahr-Richtung',
    buckets: {
      noChoice: 'Egal',
      one_way: 'Einbahn&shy;straße',
      one_way_for_cars_only: 'Einbahn&shy;straße, Fahrrad frei',
      both_directions: 'Beide Richtungen',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
  },
  carriagewayWidth: {
    title: 'Breite der Fahrbahn',
    buckets: { noChoice: 'Egal', narrow: 'Schmal', wide: 'Breit' },
    choiceMode: 'single',
    showAsIcons: false,
  },
  motorVehicleTrafficVolumen: {
    title: 'KfZ-Verkehrsaufkommen',
    buckets: {
      noChoice: 'Egal',
      low_traffic_volumen: 'Niedrig',
      no_cars: 'Ohne Autos',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
}
