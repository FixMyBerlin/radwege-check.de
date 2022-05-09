import React from 'react';
import { aggregationConfig } from '~/components/Scenes/constants';
import { ResultProps } from '../types';
import { HandleMultiChoice } from './ButtonMultiChoice/ButtonMultiChoice';
import { HandleSingleChoice } from './ButtonSingleChoice/ButtonSingleChoice';
import { FacetsButtons } from './FacetsButtons';
import { FacetsHeadline } from './FacetsHeadline';
import { checkBucketValueConsistency, checkDataConsistency } from './utils';

type Props = {
  results: ResultProps;
  handleResetFilter: () => void;
  handleSingleChoice: HandleSingleChoice;
  handleMultiChoice: HandleMultiChoice;
};

export const Facets: React.FC<Props> = ({
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
}) => {
  return (
    <nav className="absolute inset-y-0 left-0 w-72 overflow-scroll bg-gray-100 p-4">
      <p className="mb-6">
        <button
          type="button"
          onClick={handleResetFilter}
          className="underline hover:bg-yellow-100"
        >
          Filter zurücksetzen
        </button>
      </p>

      {Object.entries(results?.data?.aggregations || {}).map(
        ([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;
          const { showAsIcons } = aggregationConfig[aggregationKey];

          checkDataConsistency({ aggregationKey });
          const { keyFromItemjsMissingInTranslations } =
            checkBucketValueConsistency({ aggregationKey, buckets });

          return (
            <div key={aggregationKey} className="mb-5">
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

              {!!keyFromItemjsMissingInTranslations.length && (
                <div className="text-xs text-neutral-500">
                  Werte, die wir in den Daten bereinigen müssen:{' '}
                  {keyFromItemjsMissingInTranslations.map((v) => (
                    <code key={v} className="rounded-sm bg-red-100 px-1">
                      {v}
                    </code>
                  ))}
                </div>
              )}
            </div>
          );
        }
      )}
    </nav>
  );
};
