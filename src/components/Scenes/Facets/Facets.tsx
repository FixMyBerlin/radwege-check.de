import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../hooks'
import { ResultProps, SceneCategory } from '../types'
import {
  FacetsButtons,
  HandleMultiChoice,
  HandleSingleChoice,
} from './FacetsButtons'
import { FacetsHeadline } from './FacetsHeadline'
import { FooterLinks } from './FooterLinks'
import { Logo } from './Logo'
import { PresetDropdown, PresetDropdownProps } from './PresetDropdown'
import { ResetFilterButton } from './ResetFilterButton'

export type FacetsProps = {
  category: SceneCategory
  results: ResultProps
  /** @desc Reset filters; undefined if no filter active. */
  handleResetFilter: undefined | (() => void)
  handleSingleChoice: HandleSingleChoice
  handleMultiChoice: HandleMultiChoice
  className?: string
  showLogo: boolean
} & PresetDropdownProps

export const Facets: React.FC<FacetsProps> = ({
  category,
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
  presets,
  currentPresetKey,
  handlePresetClick,
  className,
  showLogo,
}) => {
  const aggregations = results?.data?.aggregations
  const aggregationConfig = useAggregationConfig(category)

  const mainAggregations = Object.entries(aggregations || {}).filter(
    ([key, _v]) => aggregationConfig[key].primaryGroup === true
  )

  const furtherAggregations = Object.entries(aggregations || {}).filter(
    ([key, _v]) => !aggregationConfig[key].primaryGroup
  )

  return (
    <nav
      className={classNames(className, 'overflow-y-scroll overscroll-contain')}
    >
      <Logo visible={showLogo} />

      <div
        className={classNames('z-0 mb-4 bg-gray-200 px-3 pt-5 pb-1 shadow-md')}
      >
        <h1 className="sr-only">Ergebnisse filtern</h1>

        <PresetDropdown
          presets={presets}
          currentPresetKey={currentPresetKey}
          handlePresetClick={handlePresetClick}
        />

        <ResetFilterButton onClick={handleResetFilter} />

        {mainAggregations.map(([aggregationKey, aggregation]) => {
          const { buckets } = aggregation

          return (
            <section key={aggregationKey} className={classNames('mb-5')}>
              <FacetsHeadline
                category={category}
                aggregationKey={aggregationKey}
              />

              <FacetsButtons
                aggregationKey={aggregationKey}
                category={category}
                results={results}
                buckets={buckets}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
              />
            </section>
          )
        })}
      </div>

      <div className="px-3">
        {furtherAggregations.map(([aggregationKey, aggregation]) => {
          const { buckets } = aggregation
          const { showAsIcons, groupEndIndicator } =
            aggregationConfig[aggregationKey]

          return (
            <section
              key={aggregationKey}
              className={classNames(
                { 'mb-5': !groupEndIndicator },
                { '-mt-3': showAsIcons },
                {
                  'mb-4 border-b border-dashed border-gray-300 pb-5':
                    groupEndIndicator,
                }
              )}
            >
              <FacetsHeadline
                category={category}
                aggregationKey={aggregationKey}
                forIcons={showAsIcons}
              />

              <FacetsButtons
                aggregationKey={aggregationKey}
                category={category}
                results={results}
                buckets={buckets}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
              />
            </section>
          )
        })}
      </div>

      <FooterLinks />
    </nav>
  )
}
