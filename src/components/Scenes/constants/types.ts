export type AggregationConfig = {
  [key: string]: {
    /** @desc Translation of the "Headline" of Facets (aggregations) for FilterSidebar and Results. */
    title: string
    /** @desc Optional overwrite the "Headline" for Results. */
    resultTitle?: string
    /** @desc Specify translations for FilterSidebar and Results (unless overwritten) AND order of facetButtons (unless overwritten) */
    buckets: { [key: string]: string }
    /** @desc Optinally overwrite translations for Results. */
    resultBuckets?: { [key: string]: string }
    /** @desc Optinally overwrite sort order of facetButtons. */
    sortOrder?: string[]
    /** @desc FilterSidebar: How the facetButtons behave on click and visually. */
    choiceMode: 'multi' | 'single'
    /** @desc FilterSidebar: Switch from text to icon view. Has to be `false` if `choiseMode` is 'single'. */
    showAsIcons: boolean
    /** @desc FilterSidebar: Show a line below the facet to indicate the end of a logical group. */
    groupEndIndicator?: boolean
    /** @desc FilterSidebar: Highlight this group with a background */
    primaryGroup?: boolean
  }
}

export type PresetScene = {
  title: string
  sceneIdForImage: string | null
  resultTotal: number
  averageScore: number
  searchFilterString: string
}

export type PresetsScenes = { [key: string]: PresetScene }

// TODO Try to get this working with TS magic…
//   https://bobbyhadz.com/blog/typescript-create-type-from-object-keys
// export type Presets = typeof presets;
// export type PresetKeys = keyof typeof presets | 'custom';
// ^- this needs an 'as const' on the object below.
