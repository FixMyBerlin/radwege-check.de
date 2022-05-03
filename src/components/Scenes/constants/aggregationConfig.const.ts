// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

type AggregationConfig = {
  [key: string]: {
    title: string;
    buckets: { [key: string]: string };
    sortOrder?: string[];
    doesNotMatterOption: boolean;
    showAsIcons: boolean; // has to be false if 'doesNotMatterOption' is true
  };
};

export const aggregationConfig: AggregationConfig = {
  bicycleLaneWidth: {
    title: 'Radverkehrsanlage (RVA)',
    buckets: {
      wide: 'Breit (3&thinsp;m)',
      narrow: 'Schmal (2&thinsp;m)',
      none: 'Keine RVA',
    },
    doesNotMatterOption: false,
    showAsIcons: false,
  },
  leftOfBicycleLane: {
    title: 'Lage der Radverkehrsanlage',
    buckets: {
      car_lanes: 'Fahrbahn',
      parking_lane: 'Rechts v. Parken',
      pavement: 'Seiten&shy;raum', // todo können wir nach dem nächsten csv update löschen
      // curb: 'Seiten&shy;raum',
      green: 'Grün&shy;anlage',
    },
    doesNotMatterOption: false,
    showAsIcons: false,
  },
  parking: {
    title: 'KfZ-Parken vorhanden',
    buckets: {
      doesNotMatterOption: 'Egal',
      parking_lane: 'Ja',
      no_parking: 'Nein',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bicycleLaneSurface: {
    title: 'Oberfläche RVA',
    buckets: {
      doesNotMatterOption: 'Egal',
      surface_asphalt: 'Asphalt',
      surface_green: 'Grün&shy;markierung',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferHasPhysicalProtection: {
    title: 'Bauliche Trennung RVA',
    buckets: {
      doesNotMatterOption: 'Egal',
      false: 'Ja',
      true: 'Nein',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferLeftPhysicalProtection: {
    title: 'Details der baulichen Trennung Links der RVA',
    buckets: {
      none: 'Keine',
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      planter: 'Blumenkästen',
    },
    doesNotMatterOption: false,
    showAsIcons: true,
  },
  bufferLeftWidth: {
    title: 'Markierung Links RVA',
    buckets: {
      doesNotMatterOption: 'Egal',
      narrow: 'schmal',
      wide: 'breit',
      none: 'none',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferLeftMarking: {
    title: 'Details der Marierung Links der RVA',
    buckets: {
      dashed_line: 'unterbrochen',
      double_line: 'Doppellinie',
      grass_verge: 'Grünstreifen',
      none: 'none',
      paved_verge: 'Aufpflasterung',
      restricted_area: 'Sperrfläche',
      solid_line: 'durchgezogene',
    },
    doesNotMatterOption: false,
    showAsIcons: true,
  },
  bufferRightWidth: {
    title: 'Markierung Rechts RVA',
    buckets: {
      doesNotMatterOption: 'Egal',
      narrow: 'schmal',
      wide: 'breit',
      none: 'none',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferRightMarking: {
    title: 'Details der Markierung Rechts der RVA',
    buckets: {
      double_line: 'Doppellinie',
      grass_verge: 'Grünstreifen',
      none: 'Keine',
      paved_verge: 'Aufpflasterung',
      restricted_area: 'Sperrzone',
      solid_line: 'durchgezogene',
    },
    doesNotMatterOption: false,
    showAsIcons: true,
  },
  vehicleTrafficVolume: {
    title: 'KfZ-Verkehrsaufkommen',
    buckets: {
      doesNotMatterOption: 'Egal',
      low_traffic_volumen: 'Niedrig',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  vehicleLaneMaxspeed: {
    title: 'Tempolimit',
    buckets: {
      doesNotMatterOption: 'Egal',
      '30': '30 km/h',
      '50': '50 km/h',
      sidewalk: 'Bür&shy;ger&shy;steig',
    },
    sortOrder: ['doesNotMatterOption', '30', '50', 'sidewalk'],
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrbahn Nutzung',
    buckets: {
      motor_vehicle_and_bus: 'Bus',
      motor_vehicle_and_tram: 'Tram',
      motor_vehicle_only: 'KfZ',
      motor_vehicle_only_one_way: 'Einbahnstraße',
    },
    doesNotMatterOption: false,
    showAsIcons: true,
  },
  pavementWidth: {
    title: 'Gehweg',
    buckets: {
      doesNotMatterOption: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  pavementHasShops: {
    title: 'Geschäfte / Cafétische',
    buckets: {
      doesNotMatterOption: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  surroundings: {
    title: 'surroundings',
    buckets: {
      doesNotMatterOption: 'Egal',
      park: 'Park',
      sidewalk: 'Gehweg',
      street: 'Straße',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
};
