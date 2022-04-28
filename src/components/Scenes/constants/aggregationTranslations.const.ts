export const aggregationTranslations = {
  location: {
    title: 'Verortung RVA',
    buckets: {
      pavement: 'Seitenraum',
      primary_road: 'Straße',
    },
  },
  bicycleLaneSurface: {
    title: 'Oberfläche RVA',
    buckets: {
      surface_asphalt: 'Asphalt',
      surface_green: 'Grünmarkierung',
    },
  },
  bicycleLaneWidth: {
    title: 'bicycleLaneWidth',
    buckets: {
      '-': 'todo',
      narrow: 'schmal',
      wide: 'breit',
    },
  },
  bufferLeftWidth: {
    title: 'bufferLeftWidth',
    buckets: {
      narrow: 'schmal',
      none: 'none',
      wide: 'breit',
    },
  },
  bufferLeftMarking: {
    title: 'bufferLeftMarking',
    buckets: {
      dashed_line: 'unterbrochen',
      double_line: 'Doppellinie',
      grass_verge: 'Grünstreifen',
      none: 'none',
      paved_verge: 'Aufpflasterung',
      restricted_area: 'Sperrfläche',
      solid_line: 'durchgezogene',
    },
  },
  bufferHasPhysicalProtection: {
    title: 'bufferHasPhysicalProtection',
    buckets: {
      false: 'Ja',
      true: 'Nein',
    },
  },
  bufferLeftPhysicalProtection: {
    title: 'bufferLeftPhysicalProtection',
    buckets: {
      bollard_high: 'Poller (hoch)',
      bollard_small: 'Poller (niedrig)',
      none: 'Keine',
      planter: 'Blumenkästen',
    },
  },
  bufferRightWidth: {
    title: 'bufferRightWidth',
    buckets: {
      narrow: 'schmal',
      none: 'none',
      wide: 'breit',
    },
  },
  bufferRightMarking: {
    title: 'bufferRightMarking',
    buckets: {
      double_line: 'Doppellinie',
      grass_verge: 'Grünstreifen',
      none: 'Keine',
      paved_verge: 'Aufpflasterung',
      restricted_area: 'Sperrzone',
      solid_line: 'durchgezogene',
    },
  },
  leftOfBicycleLane: {
    title: 'leftOfBicycleLane',
    buckets: {
      car_lanes: 'Fahrspur',
      green: 'Grünbereich',
      parking_lane: 'Parkspur',
      pavement: 'Seitenraum',
    },
  },
  vehicleTrafficVolume: {
    title: 'Verkehrsaufkommen Straße',
    buckets: {
      '-': 'todo',
      high_traffic_volumen_with_heavy_vehicles: 'Hoch (inkl. LKW…)',
      low_traffic_volumen: 'Niedrig',
    },
  },
  parking: {
    title: 'parking',
    buckets: {
      no_parking: 'Kein Parken',
      parking_lane: 'Parkspur',
    },
  },
  pavementHasShops: {
    title: 'pavementHasShops',
    buckets: {
      false: 'Nein',
      true: 'Ja',
    },
  },
  pavementWidth: {
    title: 'pavementWidth',
    buckets: {
      '-': 'todo',
      narrow: 'schmal',
      wide: 'breit',
    },
  },
  surroundings: {
    title: 'surroundings',
    buckets: {
      park: 'Park',
      sidewalk: 'Gehweg',
      street: 'Straße',
    },
  },
  vehicleLaneMaxspeed: {
    title: 'vehicleLaneMaxspeed',
    buckets: {
      '-': 'todo',
      '30': '30 km/h',
      '50': '50 km/h',
      sidewalk: 'Bürgersteig',
    },
  },
  vehicleLaneUsage: {
    title: 'vehicleLaneUsage',
    buckets: {
      '-': 'todo',
      motor_vehicle_and_bus: 'Bus',
      motor_vehicle_and_tram: 'Tram',
      motor_vehicle_only: 'KfZ',
      motor_vehicle_only_one_way: 'Einbahnstraße',
    },
  },
};
