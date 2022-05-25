import classNames from 'classnames';
import React from 'react';
import { aggregationConfig } from '~/components/Scenes/constants';
import { ResultProps } from '../types';
import { HandleMultiChoice } from './ButtonMultiChoice/ButtonMultiChoice';
import { HandleSingleChoice } from './ButtonSingleChoice/ButtonSingleChoice';
import { FacetsButtons } from './FacetsButtons';
import { FacetsHeadline } from './FacetsHeadline';
import { PresetDropdown, PresetDropdownProps } from './PresetDropdown';
import { checkBucketValueConsistency, checkDataConsistency } from './utils';

export type FacetsProps = {
  results: ResultProps;
  /** @desc Reset filters; undefined if no filter active. */
  handleResetFilter: undefined | (() => void);
  handleSingleChoice: HandleSingleChoice;
  handleMultiChoice: HandleMultiChoice;
  className?: string;
} & PresetDropdownProps;

export const Facets: React.FC<FacetsProps> = ({
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
  presets,
  currentPresetKey,
  handlePresetClick,
  className,
}) => {
  return (
    <nav className={classNames(className, 'overflow-scroll')}>
      <h1 className="sr-only">Ergebnisse filtern</h1>

      <PresetDropdown
        presets={presets}
        currentPresetKey={currentPresetKey}
        handlePresetClick={handlePresetClick}
      />

      <p className="mb-6">
        <button
          type="button"
          onClick={handleResetFilter}
          className={classNames(
            handleResetFilter
              ? 'hover:bg-yellow-100'
              : 'cursor-not-allowed text-gray-500 decoration-gray-300',
            'underline'
          )}
          disabled={!handleResetFilter}
        >
          Filter zurücksetzen
        </button>
      </p>

      {Object.entries(results?.data?.aggregations || {}).map(
        ([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;
          const { showAsIcons, groupEndIndicator } =
            aggregationConfig[aggregationKey];

          return (
            <section
              key={aggregationKey}
              className={classNames('mb-5', {
                '!mb-4 border-b border-dashed border-gray-300 pb-5':
                  groupEndIndicator,
              })}
            >
              <FacetsHeadline
                visible={!showAsIcons}
                aggregationKey={aggregationKey}
              />

              <FacetsButtons
                aggregationKey={aggregationKey}
                results={results}
                buckets={buckets}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
              />
            </section>
          );
        }
      )}
    </nav>
  );
};
