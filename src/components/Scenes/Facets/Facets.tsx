import classNames from 'classnames';
import React from 'react';
import { footerLegalLinks } from '~/components/Layout/Footer/FooterLinks/footerLinks.const';
import { Link } from '~/components/Link';
import { useAggregationConfig } from '../hooks';
import { ResultProps, SceneCategory } from '../types';
import { HandleMultiChoice } from './ButtonMultiChoice/ButtonMultiChoice';
import { HandleSingleChoice } from './ButtonSingleChoice/ButtonSingleChoice';
import { FacetsButtons } from './FacetsButtons';
import { FacetsHeadline } from './FacetsHeadline';
import { PresetDropdown, PresetDropdownProps } from './PresetDropdown';

export type FacetsProps = {
  category: SceneCategory;
  results: ResultProps;
  /** @desc Reset filters; undefined if no filter active. */
  handleResetFilter: undefined | (() => void);
  handleSingleChoice: HandleSingleChoice;
  handleMultiChoice: HandleMultiChoice;
  className?: string;
  showLogo: boolean;
} & PresetDropdownProps;

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
  const aggregations = results?.data?.aggregations;
  const aggregationConfig = useAggregationConfig(category);

  const mainAggregationEntries = Object.entries(aggregations || {}).filter(
    ([key, _v]) => aggregationConfig[key].primaryGroup === true
  );

  const furtherAggregationEntries = Object.entries(aggregations || {}).filter(
    ([key, _v]) => !aggregationConfig[key].primaryGroup
  );

  return (
    <nav className={classNames(className, 'overflow-scroll')}>
      {showLogo && (
        <div className="relative flex h-14 items-center bg-yellow-50 py-1 px-3 shadow-md">
          <Link to="/" classNameOverwrite="h-8">
            <img
              className="h-full"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </Link>
        </div>
      )}
      <div
        className={classNames('z-0 mb-4 bg-gray-200 px-3 pt-5 pb-1 shadow-md')}
      >
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

        {mainAggregationEntries.map(([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;

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
          );
        })}
      </div>

      <div className="px-3">
        {furtherAggregationEntries.map(([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;
          const { showAsIcons, groupEndIndicator } =
            aggregationConfig[aggregationKey];

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
          );
        })}
      </div>

      <section className="mx-3 mt-10 flex gap-3 border-t border-gray-300 py-3">
        {footerLegalLinks.map((line) => (
          <Link className="whitespace-nowrap text-gray-500" to={line.to}>
            {line.name}
          </Link>
        ))}
      </section>
    </nav>
  );
};
