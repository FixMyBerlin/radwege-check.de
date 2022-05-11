// All the options that ItemsJS needs.
// The title is not used translated here, but in aggregationConfig
// conjuction is always false since this will show the bucket_count for each bucket.
// The `choiceMode` (single | multi) is configured via aggregationConfig

export const itemJsConfig = {
  aggregations: {
    leftOfBicycleLane: {
      title: 'leftOfBicycleLane',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bicycleLaneWidth: {
      title: 'bicycleLaneWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    parking: {
      title: 'parking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bicycleLaneSurface: {
      title: 'bicycleLaneSurface',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferHasPhysicalProtection: {
      title: 'bufferHasPhysicalProtection',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferLeftPhysicalProtection: {
      title: 'bufferLeftPhysicalProtection',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferLeftWidth: {
      title: 'bufferLeftWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferLeftMarking: {
      title: 'bufferLeftMarking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferRightWidth: {
      title: 'bufferRightWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    bufferRightMarking: {
      title: 'bufferRightMarking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    vehicleTrafficVolume: {
      title: 'vehicleTrafficVolume',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    vehicleLaneMaxspeed: {
      title: 'vehicleLaneMaxspeed',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    vehicleLaneUsage: {
      title: 'vehicleLaneUsage',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    pavementHasShops: {
      title: 'pavementHasShops',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
    pavementWidth: {
      title: 'pavementWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
  },
  searchableFields: [],
  native_search_enabled: false,
};
