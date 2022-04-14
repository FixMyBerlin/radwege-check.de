export const aggregationTranslations = {
  location: {
    title: 'Verortung RVA',
    buckets: {
      pavement: 'Seitenraum',
      primary_road: 'Straße',
    },
  },
  pointOfView: {
    title: 'Nutzergruppe',
    buckets: {
      bicycle: 'Radfahrer:in',
      pedestrian: 'Fußgänger:in',
      vehicle: 'Autofahrer:in',
    },
  },
  leftOfBicycleLane: {
    title: 'Links der RVA',
    buckets: {
      car_lanes: 'Fahrstreifen',
      green_space: 'Grünanlage',
      parked_cars: 'Parkstreifen',
    },
  },
  divideLeftWidthName: {
    title: 'Schutz Links Breite',
    buckets: {
      '-': 'kein Schutz',
      narrow: 'schmal (0,25m)',
      wide: 'breit (0,75m)',
    },
  },
  divideLeftCategory: {
    title: 'Schutz Links Art',
    buckets: {
      '-': 'Kein Schutz',
      green_verge: 'Grünstreifen',
      paved_hump: 'Aufpflasterung',
    },
  },
  divideLeftStructural: {
    title: 'Schutz Links Struktur',
    buckets: {
      bollard: 'Poller',
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (klein)',
      none: 'Kein physischer Schutz',
      planter: 'Blumenkasten',
    },
  },
  bicycleLaneWidthName: {
    title: 'RVA Breite',
    buckets: {
      '-': 'todo',
      narrow: 'Schmal (2m)',
      wide: 'Breit (3,5m)',
    },
  },
  divideRightWidthName: {
    title: 'Schutz Rechts Breite',
    buckets: {
      '-': 'Kein Schutz',
      narrow: 'Schmal (0,25m)',
      wide: 'Breit (0,75m)',
    },
  },
  divideRightCategory: {
    title: 'Schutz Rechts Art',
    buckets: {
      '-': 'Kein Schutz',
      green_verge: 'Grünstreifen',
      paved_hump: 'Aufpflasterung',
    },
  },
  pavementWidthName: {
    title: 'Gehweg Breite',
    buckets: {
      '-': '-',
      narrow: 'Schmal',
      wide: 'Breit',
    },
  },
  pavementHasShops: {
    title: 'pavementHasShops',
    buckets: {
      '-': 'todo (nein?)',
      yes: 'Ja',
    },
  },
  bicycleLaneWidthUsable: {
    title: 'RVA Breite (nutzbar)',
    buckets: {},
  },
  vehicleLaneUsage: {
    title: 'Fahrbahn Nutzungsart',
    buckets: {
      '-': 'todo',
      motor_vehicle_and_bus: 'Kfz+Bus',
      motor_vehicle_and_tram: 'Kfz+Tram',
      motor_vehicle_only: 'Nur Kfz',
      motor_vehicle_only_one_way: 'Nur Kfz (Einbahnstraße)',
    },
  },
  vehicleLaneMaxspeed: {
    title: 'Fahrbahn Geschwindigkeit',
    buckets: {
      '-': 'todo',
      '30': '30 km/h',
      '50': '50 km/h',
      not_applicable_protected_by_parking: 'Egal (Parkstreifen)',
    },
  },
  bicycleLaneLanes: {
    title: 'bicycleLaneLanes (TODO)',
    buckets: {},
  },
  bicycleLaneSurface: {
    title: 'RVA Oberfläche',
    buckets: {
      '-': '-',
      asphalt: 'Asphalt',
      asphalt_colored: 'Farbe',
      asphalt_colored_hatching: 'Farbe+Schraffur',
    },
  },
  divideLeftMarking: {
    title: 'Schutz Links Markierung',
    buckets: {
      '-': '-',
      double_line: 'Doppellinie',
      interrupted: 'unterbrochen',
      prohibited_area: 'Sperrfläche',
      solid_line: 'durchgezogen',
    },
  },
  divideRightMarking: {
    title: 'Schutz Rechts Markierung',
    buckets: {
      '-': '-',
      double_line: 'Doppellinie',
      prohibited_area: 'Sperrfläche',
      solid_line: 'durchgezogen',
    },
  },
  parkingCategory: {
    title: 'Parken',
    buckets: {
      '-': '-',
      no_parking: 'Kein Parkstreifen',
      parallel_parking: 'Parallel parken',
    },
  },
  rightOfBicycleLane: {
    title: 'Rechts der RVA',
    buckets: {
      '-': '-',
      park: 'Grünanlage',
      sidewalk: 'Gehweg',
    },
  },
  divideIsPhysical: {
    title: 'Physischer Schutz',
    buckets: {
      false: 'Nein',
      true: 'Ja',
    },
  },
  motorVehicleTrafficVolumen: {
    title: 'Verkehrsaufkommen',
    buckets: {
      '-': 'TODO',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch',
      low_traffic_volumen: 'Niedrig',
    },
  },
};
