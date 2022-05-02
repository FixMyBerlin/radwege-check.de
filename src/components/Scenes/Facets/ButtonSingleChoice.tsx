import React from 'react';
import { aggregationConfig } from '../constants';
import { ResultBucketProps } from '../types';
import { buttonClassNames } from './buttonClassNames';

export type HandleSingleChoiceProps = {
  aggregationKey: string;
  selectedBucketKey: string | null;
};

export type HandleSingleChoice = ({
  aggregationKey,
  selectedBucketKey,
}: HandleSingleChoiceProps) => void;

type Props = {
  aggregationKey: string;
  bucket: ResultBucketProps;
  buckets: ResultBucketProps[];
  handleClick: HandleSingleChoice;
  index: number;
  paginationTotal: number;
};

export const ButtonSingleChoice: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}) => {
  const { showAsIcons } = aggregationConfig[aggregationKey];
  const { doesNotMatterOption } = aggregationConfig[aggregationKey];

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const uiSelected = doesNotMatterOption
    ? bucket?.selected
    : bucket?.selected || !anyOfGroupSelected;
  const uiCanpress = doesNotMatterOption ? true : !!bucket?.doc_count;
  const firstElement = doesNotMatterOption ? false : index === 0;
  const lastElement = index === buckets.length - 1;

  const futureResult = uiSelected
    ? (paginationTotal || 0) - parseInt(bucket?.doc_count, 10)
    : '-';

  return (
    <button
      key={bucket.key}
      type="button"
      className={buttonClassNames({
        firstElement,
        lastElement,
        uiSelected,
        uiCanpress,
      })}
      onClick={() =>
        uiCanpress &&
        handleClick({
          aggregationKey,
          selectedBucketKey: bucket.key,
        })
      }
      title={`${
        aggregationConfig[aggregationKey].buckets[bucket.key]
      } – Ergebnisse ${futureResult}`}
    >
      {showAsIcons ? (
        <span className="font-bold uppercase">
          {aggregationConfig[aggregationKey].buckets[bucket.key]?.charAt(0) ||
            'TODO'}
        </span>
      ) : (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO',
          }}
        />
      )}
    </button>
  );
};
