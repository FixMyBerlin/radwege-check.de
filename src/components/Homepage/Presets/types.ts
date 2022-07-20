export type FilterUrlProp = `/${'hauptstrassen' | 'nebenstrassen'}/?filter=`

export type FilterUrlBySceneCategory = {
  primary: FilterUrlProp
  secondary: FilterUrlProp
}
