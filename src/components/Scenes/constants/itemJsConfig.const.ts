// All the options that ItemsJS needs.
// The title is not used translated here, but in aggregationConfig
// conjuction === false # => choiseMode: 'single'
// conjuction === true  # => choiseMode: 'multi'

export const itemJsConfig = {
  aggregations: {
    bicycleLaneWidth: {
      title: 'bicycleLaneWidth',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: false,
    },
    leftOfBicycleLane: {
      title: 'leftOfBicycleLane',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: false,
    },
    parking: {
      title: 'parking',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bicycleLaneSurface: {
      title: 'bicycleLaneSurface',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferHasPhysicalProtection: {
      title: 'bufferHasPhysicalProtection',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferLeftPhysicalProtection: {
      title: 'bufferLeftPhysicalProtection',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferLeftWidth: {
      title: 'bufferLeftWidth',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferLeftMarking: {
      title: 'bufferLeftMarking',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferRightWidth: {
      title: 'bufferRightWidth',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    bufferRightMarking: {
      title: 'bufferRightMarking',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    vehicleTrafficVolume: {
      title: 'vehicleTrafficVolume',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    vehicleLaneMaxspeed: {
      title: 'vehicleLaneMaxspeed',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    vehicleLaneUsage: {
      title: 'vehicleLaneUsage',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    pavementHasShops: {
      title: 'pavementHasShops',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    pavementWidth: {
      title: 'pavementWidth',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
    surroundings: {
      title: 'surroundings',
      size: 10,
      sort: 'term',
      order: 'asc',
      conjunction: true,
    },
  },
  searchableFields: [],
  native_search_enabled: false,
};
