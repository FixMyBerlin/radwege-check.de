// All the options that ItemsJS needs.
// The title is not used translated here, but in aggregationConfig
// conjuction is always false since this will show the bucket_count for each bucket.
// The `choiceMode` (single | multi) is configured via aggregationConfig

export const itemJsConfigSecondary = {
  aggregations: {
    leftOfBicycleLane: {
      title: 'leftOfBicycleLane',
      size: 10,
      sort: 'term', // not used
      order: 'asc', // not used
      conjunction: false, // always false
    },
  },
  searchableFields: [],
  native_search_enabled: false,
}
