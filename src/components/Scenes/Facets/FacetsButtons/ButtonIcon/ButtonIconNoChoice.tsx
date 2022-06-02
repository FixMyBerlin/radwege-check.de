import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import { HandleSingleChoice } from '../ButtonSingleChoice/ButtonSingleChoice'
import { buttonIconClassNames } from './utils'

type Props = {
  aggregationKey: string
  category: SceneCategory
  bucketKey: string
  buckets: ResultBucketProps[]
  handleClick: HandleSingleChoice
}

export const ButtonIconNoChoice: React.FC<Props> = ({
  aggregationKey,
  category,
  bucketKey,
  buckets,
  handleClick,
}) => {
  const aggregationConfig = useAggregationConfig(category)
  const { showAsIcons } = aggregationConfig[aggregationKey]

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected)
  const uiSelected = !anyOfGroupSelected
  const uiCanpress = anyOfGroupSelected

  const { buttonClasses, iconClasses } = buttonIconClassNames({
    uiSelected,
    uiCanpress,
  })

  return (
    <button
      key={`${aggregationKey}__${bucketKey}`}
      type="button"
      className={buttonClasses}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: null,
        })
      }
      disabled={!uiCanpress}
      title=""
    >
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucketKey] || 'TODO',
        }}
        className={classNames(showAsIcons && iconClasses)}
      />
    </button>
  )
}
