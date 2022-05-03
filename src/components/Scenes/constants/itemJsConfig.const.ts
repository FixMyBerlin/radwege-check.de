// All the options that ItemsJS needs.
// The title is not used translated here, but in aggregationConfig
// conjuction === false # => choiseMode: 'single'
// conjuction === true  # => choiseMode: 'multi'

export const itemJsConfig = {
  aggregations: {
    bicycleLaneWidth: {
      title: 'bicycleLaneWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false,
    },
    leftOfBicycleLane: {
      title: 'leftOfBicycleLane',
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
      conjunction: true,
    },
    bicycleLaneSurface: {
      title: 'bicycleLaneSurface',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    bufferHasPhysicalProtection: {
      title: 'bufferHasPhysicalProtection',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    bufferLeftPhysicalProtection: {
      title: 'bufferLeftPhysicalProtection',
      size: 10,
      conjunction: true,
      sort: 'term', // not used
      order: 'asc', // not used
    },
    bufferLeftWidth: {
      title: 'bufferLeftWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    bufferLeftMarking: {
      title: 'bufferLeftMarking',
      size: 10,
      conjunction: true,
      sort: 'term', // not used
      order: 'asc', // not used
    },
    bufferRightWidth: {
      title: 'bufferRightWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    bufferRightMarking: {
      title: 'bufferRightMarking',
      size: 10,
      conjunction: true,
      sort: 'term', // not used
      order: 'asc', // not used
    },
    vehicleTrafficVolume: {
      title: 'vehicleTrafficVolume',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    vehicleLaneMaxspeed: {
      title: 'vehicleLaneMaxspeed',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    vehicleLaneUsage: {
      title: 'vehicleLaneUsage',
      size: 10,
      conjunction: true,
      sort: 'term', // not used
      order: 'asc', // not used
    },
    pavementHasShops: {
      title: 'pavementHasShops',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    pavementWidth: {
      title: 'pavementWidth',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
    surroundings: {
      title: 'surroundings',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: true,
    },
  },
  searchableFields: [],
  native_search_enabled: false,
};
