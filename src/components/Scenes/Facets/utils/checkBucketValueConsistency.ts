import { useAggregationConfig } from '../../hooks'
import { ResultBucketProps, SceneCategory } from '../../types'

type Props = {
  category: SceneCategory
  aggregationKey: string
  buckets: Array<ResultBucketProps>
}
type ReturnProps = {
  keyFromItemjsMissingInTranslations: string[]
  keyFromTranslationMissingInItemjs: string[]
}

export const checkBucketValueConsistency = ({
  category,
  aggregationKey,
  buckets,
}: Props): ReturnProps => {
  const aggregationConfig = useAggregationConfig(category)
  const bucketKeysFromItemJs = buckets.map((b) => b.key)
  const keyFromItemjsMissingInTranslations = bucketKeysFromItemJs.filter(
    (key) => aggregationConfig[aggregationKey].buckets[key] === undefined
  )

  if (keyFromItemjsMissingInTranslations.length) {
    // eslint-disable-next-line no-console
    console.log({
      ERROR: `Missing bucket keys (${keyFromItemjsMissingInTranslations.length}) in aggregationConfig (but present in Itemjs).`,
      aggregationKey,
      missing: keyFromItemjsMissingInTranslations.join('; '),
    })
  }

  const keyFromTranslationMissingInItemjs = Object.keys(
    aggregationConfig[aggregationKey].buckets
  )
    .filter((key) => !bucketKeysFromItemJs.includes(key))
    .filter((key) => key !== 'bothButton')

  if (keyFromTranslationMissingInItemjs.length) {
    // eslint-disable-next-line no-console
    console.log({
      ERROR: `Missing bucket keys (${keyFromTranslationMissingInItemjs.length}) in ItemJs (but present in aggregationConfig).`,
      aggregationKey,
      missing: keyFromTranslationMissingInItemjs.join('; '),
    })
  }

  return {
    keyFromItemjsMissingInTranslations,
    keyFromTranslationMissingInItemjs,
  }
}
