import clsx from 'clsx'
import React from 'react'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { ResultBucketProps } from '../../../types'
import { HandleSingleChoice } from '../ButtonSingleChoice/ButtonSingleChoice'
import { buttonIconClassNames } from './utils'

type Props = {
  aggregationKey: string
  bucketKey: string
  buckets: ResultBucketProps[]
  handleClick: HandleSingleChoice
}

export const ButtonIconNoChoice: React.FC<Props> = ({
  aggregationKey,
  bucketKey,
  buckets,
  handleClick,
}) => {
  const { aggregationConfig } = useStore(useStoreExperimentData)
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
        className={clsx(showAsIcons && iconClasses)}
      />
    </button>
  )
}
