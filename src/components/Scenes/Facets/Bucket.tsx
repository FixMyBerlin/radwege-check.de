import classNames from 'classnames';
import React from 'react';
import { TranslationMissing } from '~/components/TextHelper';
import { aggregationConfig, itemJsConfig } from '../constants';
import { ResultBucketProps } from '../types';

export type Display = 'grid' | 'line';

export type HandleFilterClickProps = {
  aggregationKey: string;
  buckets: ResultBucketProps[];
  selectedBucket: ResultBucketProps;
  choiseMode: 'multi' | 'single';
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
  display: Display;
  keyValue: string;
};

export const Bucket: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleFilterClick,
  index,
  paginationTotal,
  display,
  keyValue,
}) => {
  const { showAsIcons } = aggregationConfig[aggregationKey];
  const { doesNotMatterOption } = aggregationConfig[aggregationKey];
  const { conjunction } = itemJsConfig.aggregations[aggregationKey];

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const uiSelected = bucket?.selected || !anyOfGroupSelected;
  const uiCanpress = !!bucket?.doc_count;
  const firstElement = index === (doesNotMatterOption ? -1 : 0);
  const lastElement = index === buckets.length - 1;

  const futureResult = uiSelected
    ? (paginationTotal || 0) - parseInt(bucket?.doc_count, 10)
    : '-';

  return (
    <button
      key={`${aggregationKey}__${keyValue}`}
      type="button"
      className={classNames(
        'inline-flex h-16 flex-col items-center justify-center border border-gray-300 bg-white p-1 text-sm font-medium',
        '[word-break:break-word] [hyphens:auto]',
        { 'w-full': display === 'line' },
        { 'w-full': display === 'grid' },
        { 'rounded-l-md': firstElement },
        { '-ml-px': !firstElement },
        { 'rounded-r-md': lastElement },
        {
          'z-10 border-yellow-300 bg-yellow-50 shadow-inner': uiSelected,
        },
        {
          'shadow-md': !uiSelected,
        },
        {
          'fokus:bg-yellow-100 text-gray-700 hover:bg-yellow-100 focus:z-50 focus:border-orange-300 focus:shadow-inner focus:outline-none focus:ring-1 focus:ring-orange-300':
            uiCanpress,
        },
        {
          'z-10 cursor-default border-yellow-200 bg-neutral-100 text-neutral-500':
            !uiCanpress,
        }
      )}
      onClick={() =>
        uiCanpress &&
        handleFilterClick({
          aggregationKey,
          buckets,
          selectedBucket: bucket,
          choiseMode: conjunction ? 'multi' : 'single',
        })
      }
      title={`${aggregationConfig[aggregationKey].buckets[keyValue]} – Ergebnisse ${futureResult}`}
    >
      {showAsIcons ? (
        <span className="font-bold uppercase">
          {aggregationConfig[aggregationKey].buckets[keyValue]?.charAt(0) || (
            <TranslationMissing
              value={aggregationConfig[aggregationKey].buckets[keyValue]}
            />
          )}
        </span>
      ) : (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: aggregationConfig[aggregationKey].buckets[keyValue],
          }}
        />
      )}
    </button>
  );
};
