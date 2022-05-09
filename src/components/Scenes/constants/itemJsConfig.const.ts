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
      conjunction: false,
    },
    bicycleLaneWidth: {
      title: 'bicycleLaneWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    parking: {
      title: 'parking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bicycleLaneSurface: {
      title: 'bicycleLaneSurface',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferHasPhysicalProtection: {
      title: 'bufferHasPhysicalProtection',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferLeftPhysicalProtection: {
      title: 'bufferLeftPhysicalProtection',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferLeftWidth: {
      title: 'bufferLeftWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferLeftMarking: {
      title: 'bufferLeftMarking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferRightWidth: {
      title: 'bufferRightWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    bufferRightMarking: {
      title: 'bufferRightMarking',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    vehicleTrafficVolume: {
      title: 'vehicleTrafficVolume',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    vehicleLaneMaxspeed: {
      title: 'vehicleLaneMaxspeed',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    vehicleLaneUsage: {
      title: 'vehicleLaneUsage',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    pavementHasShops: {
      title: 'pavementHasShops',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    pavementWidth: {
      title: 'pavementWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    surroundings: {
      title: 'surroundings',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
  },
  searchableFields: [],
  native_search_enabled: false,
};
