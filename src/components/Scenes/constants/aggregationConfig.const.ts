// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

type AggregationConfig = {
  [key: string]: {
    title: string;
    buckets: { [key: string]: string };
    doesNotMatterOption: boolean;
    showAsIcons: boolean; // has to be false if 'doesNotMatterOption' is true
  };
};

export const aggregationConfig: AggregationConfig = {
  bicycleLaneWidth: {
    title: 'Breite Radverkehrsanlage (RVA)',
    buckets: {
      none: 'Keine',
      narrow: 'Schmal',
      wide: 'Breit',
    },
    doesNotMatterOption: false,
    showAsIcons: false,
  },
  leftOfBicycleLane: {
    title: 'Lage RVA (Was liegt links der RVA?)',
    buckets: {
      car_lanes: 'Fahrspur',
      green: 'Grün&shy;bereich',
      parking_lane: 'Parkspur',
      pavement: 'Seiten&shy;raum',
    },
    doesNotMatterOption: false,
    showAsIcons: false,
  },
  parking: {
    title: 'KfZ-Parken',
    buckets: {
      no_parking: 'Ja',
      parking_lane: 'Nein',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bicycleLaneSurface: {
    title: 'Oberfläche RVA',
    buckets: {
      surface_asphalt: 'Asphalt',
      surface_green: 'Grünmarkierung',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferHasPhysicalProtection: {
    title: 'Bauliche Trennung RVA',
    buckets: {
      false: 'Ja',
      true: 'Nein',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  bufferLeftPhysicalProtection: {
    title: 'Details der baulichen Trennung Links der RVA',
    buckets: {
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      none: 'Keine',
      planter: 'Blumenkästen',
    },
    doesNotMatterOption: false,
    showAsIcons: true,
  },
  bufferLeftWidth: {
    title: 'Markierung Links RVA',
    buckets: {
      narrow: 'schmal',
      none: 'none',
      wide: 'breit',
      doesNotMatterOption: 'Egal',
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
      narrow: 'schmal',
      none: 'none',
      wide: 'breit',
      doesNotMatterOption: 'Egal',
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
      '-': 'todo',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch',
      low_traffic_volumen: 'Niedrig',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  vehicleLaneMaxspeed: {
    title: 'Tempolimit',
    buckets: {
      '-': 'todo',
      '30': '30 km/h',
      '50': '50 km/h',
      sidewalk: 'Bürgersteig',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrbahn Nutzung',
    buckets: {
      '-': 'todo',
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
      '-': 'todo',
      narrow: 'Schmal',
      wide: 'Breit',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  pavementHasShops: {
    title: 'Geschäfte / Cafétische',
    buckets: {
      false: 'Nein',
      true: 'Ja',
      doesNotMatterOption: 'Egal',
    },
    doesNotMatterOption: true,
    showAsIcons: false,
  },
  surroundings: {
    title: 'surroundings',
    buckets: {
      park: 'Park',
      sidewalk: 'Gehweg',
      street: 'Straße',
    },
    doesNotMatterOption: false,
    showAsIcons: false,
  },
};
