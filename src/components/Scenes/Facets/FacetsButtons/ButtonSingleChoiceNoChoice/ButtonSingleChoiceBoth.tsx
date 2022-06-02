import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import CircleIcon from '../assets/circle-icon.svg'
import { HandleSingleChoice } from '../ButtonSingleChoice/ButtonSingleChoice'
import { buttonClassNames, buttonIconClassNames } from '../utils'

type Props = {
  aggregationKey: string
  category: SceneCategory
  bucketKey: string
  buckets: ResultBucketProps[]
  handleClick: HandleSingleChoice
}

export const ButtonSingleChoiceNoChoice: React.FC<Props> = ({
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
  const firstElement = true
  const lastElement = false

  let buttonClasses
  let iconClasses

  if (showAsIcons) {
    const assignIconClasses = buttonIconClassNames({
      uiSelected,
      uiCanpress,
    })
    buttonClasses = assignIconClasses.buttonClasses
    iconClasses = assignIconClasses.iconClasses
  } else {
    const assignButtonClasses = buttonClassNames({
      firstElement,
      lastElement,
      uiSelected,
      uiCanpress,
    })
    buttonClasses = assignButtonClasses.buttonClasses
    iconClasses = assignButtonClasses.iconClasses
  }

  return (
    <button
      key={`${aggregationKey}__${bucketKey}`}
      type="button"
      className={classNames(buttonClasses)}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: null,
        })
      }
      disabled={!uiCanpress}
      title=""
    >
      {!showAsIcons && (
        <div className="my-1 flex flex-none justify-center">
          <CircleIcon className={classNames(iconClasses, 'h-4')} />
        </div>
      )}
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
