// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

type AggregationConfig = {
  [key: string]: {
    title: string;
    buckets: { [key: string]: string };
    sortOrder?: string[];
    choiceMode: 'multi' | 'single';
    showAsIcons: boolean; // has to be false if 'choiceMode' is true
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
  },
  bicycleLaneWidth: {
    title: 'Radverkehrsanlage (RVA)',
    buckets: {
      wide: 'Breit<br />(3,5&thinsp;m)',
      narrow: 'Schmal<br />(2&thinsp;m)',
      shared_bus_lane: 'Busspur Fahrrad frei',
      none: 'Keine RVA',
    },
    choiceMode: 'multi',
    showAsIcons: false,
  },
  parking: {
    title: 'KfZ-Parken vorhanden',
    buckets: {
      bothButton: 'Egal',
      parking_lane: 'Ja',
      no_parking: 'Nein',
    },
    choiceMode: 'single',
    showAsIcons: false,
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
    title: 'Bauliche Trennung links RVA',
    buckets: {
      bothButton: 'Egal',
      true: 'Ja',
      false: 'Nein',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  bufferLeftPhysicalProtection: {
    title: 'Details der baulichen Trennung Links der RVA',
    buckets: {
      none: 'Keine',
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      planter: 'Blumenkästen',
      green: 'Grünanlage',
    },
    choiceMode: 'multi',
    showAsIcons: true,
  },
  bufferLeftWidth: {
    title: 'Markierung Links RVA',
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
    choiceMode: 'multi',
    showAsIcons: true,
  },
  bufferRightWidth: {
    title: 'Markierung Rechts RVA',
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
    title: 'Details der Markierung Rechts der RVA',
    buckets: {
      double_line: 'Doppellinie',
      grass_verge: 'Grünstreifen',
      none: 'Keine',
      paved_verge: 'Aufpflasterung',
      restricted_area: 'Sperrzone',
      solid_line: 'durchgezogene',
    },
    choiceMode: 'multi',
    showAsIcons: true,
  },
  vehicleTrafficVolume: {
    title: 'KfZ-Verkehrsaufkommen',
    buckets: {
      bothButton: 'Egal',
      low_traffic_volumen: 'Niedrig',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch (mit LKW)', // Schwerlastverkehr ggf. im Tooltipp erwähnen
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
    sortOrder: ['choiceMode', '30', '50', 'sidewalk', '-'],
    choiceMode: 'single',
    showAsIcons: false,
  },
  vehicleLaneUsage: {
    title: 'Fahrbahn Nutzung',
    buckets: {
      bothButton: 'Egal',
      motor_vehicle_and_tram: 'Fahrspur mit Tram',
      motor_vehicle_only: 'Eine Fahrspur',
      motor_vehicle_only_one_way: 'Zwei Fahrspuren',
    },
    choiceMode: 'single',
    showAsIcons: false,
  },
  pavementWidth: {
    title: 'Gehweg',
    buckets: {
      bothButton: 'Egal',
      narrow: 'Schmal',
      wide: 'Breit',
      '-': 'todo',
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
    choiceMode: 'single',
    showAsIcons: false,
  },
};
