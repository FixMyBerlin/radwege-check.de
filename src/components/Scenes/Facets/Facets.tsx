import classNames from 'classnames';
import React from 'react';
import { aggregationTranslations } from '~/components/Scenes/constants';
import { ResultBucketProps, ResultProps } from '../types';

export type handleFilterClickProps = {
  aggregationKey: string;
  buckets: ResultBucketProps[];
  selectedBucket: ResultBucketProps;
};

type Props = {
  results: ResultProps;
  handleResetFilter: () => void;
  handleFilterClick: ({
    aggregationKey,
    buckets,
    selectedBucket,
  }: handleFilterClickProps) => void;
};

export const Facets: React.FC<Props> = ({
  results,
  handleResetFilter,
  handleFilterClick,
}) => {
  return (
    <nav className="absolute inset-y-0 left-0 w-80 overflow-scroll bg-gray-100 p-4">
      <p className="mb-6">
        <a href="#reset" onClick={handleResetFilter} className="underline">
          Reset filter
        </a>
      </p>

      {Object.entries(results?.data?.aggregations || {}).map(
        ([aggregationKey, aggregation]) => {
          const { buckets } = aggregation;

          // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
          const anyOfGroupSelected = buckets.some((b) => b.selected);

          // Filter some buckets
          if ([].includes(aggregationKey)) {
            return null;
          }

          return (
            <div key={aggregationKey} className={classNames('mb-5')}>
              <h5 title={aggregationKey} className="font-bold">
                {aggregationTranslations[aggregationKey]?.title ||
                  `TODO ${aggregationKey}`}
              </h5>

              <span className="relative z-0 inline-flex rounded-md shadow-sm">
                {buckets
                  .sort((a, b) =>
                    // eslint-disable-next-line no-nested-ternary
                    a.key > b.key ? 1 : b.key > a.key ? -1 : 0
                  )
                  .map((bucket, index) => {
                    const uiSelected = bucket.selected || !anyOfGroupSelected;
                    const uiCanpress = !!bucket.doc_count;
                    const firstElement = index === 0;
                    const lastElement = index === buckets.length - 1;

                    return (
                      <button
                        key={bucket.key}
                        type="button"
                        className={classNames(
                          'relative inline-flex flex-col items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium',
                          { 'rounded-l-md': firstElement },
                          { '-ml-px': !firstElement },
                          { 'rounded-r-md': lastElement },
                          {
                            'z-10 border-indigo-200 bg-indigo-50 shadow-inner':
                              uiSelected,
                          },
                          {
                            'shadow-md': !uiSelected,
                          },
                          {
                            'text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500':
                              uiCanpress,
                          },
                          {
                            'z-10 cursor-default border-neutral-200 bg-neutral-100 text-neutral-500':
                              !uiCanpress,
                          }
                        )}
                        onClick={() =>
                          uiCanpress &&
                          handleFilterClick({
                            aggregationKey,
                            buckets: aggregation.buckets,
                            selectedBucket: bucket,
                          })
                        }
                      >
                        {aggregationTranslations[aggregationKey].buckets[
                          bucket.key
                        ] ||
                          bucket.key ||
                          '(todo)'}{' '}
                        <small className="text-xs text-neutral-400">
                          {uiSelected
                            ? (results?.pagination?.total || 0) -
                              parseInt(bucket.doc_count, 10)
                            : '-'}
                        </small>
                      </button>
                    );
                  })}
              </span>
            </div>
          );
        }
      )}
    </nav>
  );
};
