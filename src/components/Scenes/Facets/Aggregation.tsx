import classNames from 'classnames';
import React from 'react';
import { TranslationMissing } from '~/components/TranslationMissing/TranslationMissing';
import { aggregationTranslations } from '../constants';
import { ResultBucketProps } from '../types';

export type HandleFilterClickProps = {
  aggregationKey: string;
  buckets: ResultBucketProps[];
  selectedBucket: ResultBucketProps;
};

export type HandleFilterClick = ({
  aggregationKey,
  buckets,
  selectedBucket,
}: HandleFilterClickProps) => void;

type Props = {
  aggregationKey: string;
  bucket: ResultBucketProps;
  buckets: ResultBucketProps[];
  handleFilterClick: HandleFilterClick;
  index: number;
  paginationTotal: number;
};

export const Aggregation: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleFilterClick,
  index,
  paginationTotal,
}) => {
  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);

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
          'z-10 border-indigo-200 bg-indigo-50 shadow-inner': uiSelected,
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
          buckets,
          selectedBucket: bucket,
        })
      }
    >
      {aggregationTranslations[aggregationKey].buckets[bucket.key] || (
        <TranslationMissing value={bucket.key} />
      )}{' '}
      <small className="text-xs text-neutral-400">
        {uiSelected
          ? (paginationTotal || 0) - parseInt(bucket.doc_count, 10)
          : '-'}
      </small>
    </button>
  );
};
