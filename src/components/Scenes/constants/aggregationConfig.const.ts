// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

type AggregationConfig = {
  [key: string]: {
    /** @desc Translation of the "Headline" of Facets (aggregations) for FilterSidebar and Results. */
    title: string;
    /** @desc Optional overwrite the "Headline" for Results. */
    resultTitle?: string;
    /** @desc Specify translations for FilterSidebar and Results (unless overwritten) AND order of facetButtons (unless overwritten) */
    buckets: { [key: string]: string };
    /** @desc Optinally overwrite translations for Results. */
    resultBuckets?: { [key: string]: string };
    /** @desc Optinally overwrite sort order of facetButtons. */
    sortOrder?: string[];
    /** @desc FilterSidebar: How the facetButtons behave on click and visually. */
    choiceMode: 'multi' | 'single';
    /** @desc FilterSidebar: Switch from text to icon view. Has to be `false` if `choiseMode` is 'single'. */
    showAsIcons: boolean;
    /** @desc FilterSidebar: Show a line below the facet to indicate the end of a logical group. */
    groupEndIndicator?: boolean;
    /** @desc FilterSidebar: Highlight this group with a background */
    primaryGroup?: boolean;
  };
};

export const aggregationConfig: AggregationConfig = {
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
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
      bothButton: 'Egal',
      '30': '30 km/h',
      '50': 'Keins',
    },
    resultBuckets: {
      '50': 'Kein Limit (50 km/h)',
    },
    sortOrder: ['bothButton', '30', '50'],
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrstreifen Nutzung',
    resultTitle: 'Nutzung der Fahrstreifen',
    buckets: {
      bothButton: 'Egal',
      motor_vehicle_and_tram: 'Fahrstreifen mit Tram',
      motor_vehicle_only: 'Eine Fahrstreifen',
      motor_vehicle_only_one_way: 'Zwei Fahrstreifen',
    },
    choiceMode: 'single',
    showAsIcons: false,
    groupEndIndicator: true,
  },
  pavementWidth: {
    title: 'Gehweg',
    resultTitle: 'Gehwegbreite',
    buckets: {
      bothButton: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  pavementHasShops: {
    title: 'Geschäfte / Cafétische',
    buckets: {
      bothButton: 'Egal',
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
};
