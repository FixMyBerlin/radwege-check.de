// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

import { AggregationConfig } from './types'

export const aggregationConfigSecondary: AggregationConfig = {
  motorVehicleTrafficVolumen: {
    title: 'Kfz-Verkehr',
    buckets: {
      noChoice: 'Egal',
      low_traffic_volumen: 'Ja',
      no_cars: 'Autofrei',
    },
    tooltipBuckets: {
      noChoice: 'keine Auswahl',
      low_traffic_volumen:
        'Es sind keine Autos auf der Fahrbahn zu sehen. Parkstände sind aber ggf. vorhanden. ',
      no_cars: 'Es sind Autos auf der Fahrbahn zu sehen.',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bicycleStreetType: {
    title: 'Markierung / Gestaltung',
    buckets: {
      none: 'Keine',
      bicycle_road: 'Fahrradstraße',
      markings_bike_icon_dooring_zone: 'Fahrradstraße Sondermarkierung',
      living_street: 'Spielstraße',
      green_surface: 'Grüne Fahrbahn',
    },
    resultBuckets: {
      none: 'Keine<br />&nbsp;', // Hacky way to make the result cells the same height
      bicycle_road: 'Fahrradstraße<br />&nbsp;',
      markings_bike_icon_dooring_zone: 'Fahrradstraße <br />Sondermarkierung',
      living_street: 'Spielstraße<br />&nbsp;',
      green_surface: 'Grüne Fahrbahn<br />&nbsp;',
    },
    tooltipBuckets: {
      none: 'keine Auswahl',
      bicycle_road:
        '"klassische" Fahrradstraße, visualisiert durch große Markierung auf dem Boden',
      markings_bike_icon_dooring_zone:
        'Fahrradstraße mit einer Sondermarkierung (zwei Pfeile und unterbrochene Linie zu Parkständen). Basierend auf den Berliner Empfehlungen für die Gestaltung von Fahrradstraßen.',
      living_street: 'Verkehrsberuhigter Bereich',
      green_surface:
        'Grüneinfärbung des Fahrbahnbereichs und Sondermarkierung. Zusätzlich aufpflasterung eines Mittelstreifens, wenn Fahrbahn ausreichend breit.',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    showAsList: true,
  },
  carriagewayDirection: {
    title: 'Freigabe Fahrtrichtungen',
    buckets: {
      noChoice: 'Egal',
      both_directions: 'Beide Richtungen (Kfz & Rad)',
      one_way: 'Ein&shy;bahn&shy;straße (Kfz & Rad)',
      one_way_for_cars_only:
        'Ein&shy;bahn&shy;straße Fahrrad frei <br />(Kfz-Gegenverkehr)',
    },
    resultBuckets: {
      both_directions: 'Beide Richtungen <br />(Kfz & Rad)',
      one_way: 'Ein&shy;bahn&shy;straße <br />(Kfz & Rad)',
      one_way_for_cars_only:
        'Ein&shy;bahn&shy;straße Fahrrad frei (Kfz-Gegenverkehr)',
    },
    tooltipBuckets: {
      noChoice: 'keine Auswahl',
      both_directions: 'Kfz und Fahrradverkehr in beide Richtungen.',
      one_way: 'Einbahnstraße: Kfz und Fahrradverkehr fahren in eine Richtung',
      one_way_for_cars_only:
        'Einbahnstraße: Kfz und Fahrradverkehr fahren gegenläufige Richtungen',
    },
    choiceMode: 'single',
    showAsIcons: false,
    showAsList: true,
  },
  carriagewayWidth: {
    title: 'Breite Fahrbahn',
    resultTitle: 'Breite der Fahrbahn',
    buckets: {
      noChoice: 'Egal',
      wide: 'Breit <br />(6 m)',
      narrow: 'Schmal <br />(3,5 m)',
    },
    resultBuckets: {
      noChoice: 'Egal',
      wide: 'Breit',
      narrow: 'Schmal',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  parkingCategory: {
    title: 'Kfz-Parken',
    buckets: {
      noChoice: 'Egal',
      no_parking: 'Kein Parken',
      parking_one_side: 'Rechte Seite',
      parking_both_sides: 'Beide Seiten',
    },
    tooltipBuckets: {
      noChoice: 'keine Auswahl',
      no_parking: 'Keine Kfz-Parkstreifen',
      parking_one_side: 'Kfz-Parkstreifen rechts der Fahrbahn',
      parking_both_sides: 'Kfz-Parkstreifen auf beiden Seiten der Fahrbahn',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
}
