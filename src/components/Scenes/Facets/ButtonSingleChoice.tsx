import React from 'react';
import { aggregationConfig } from '../constants';
import { ResultBucketProps } from '../types';
import { buttonClassNames } from './utils';

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

  const uiSelected = bucket?.selected;
  const uiCanpress = !bucket?.selected;
  const firstElement = index === 0;
  const lastElement = index === buckets.length;
  // We might need something like this … – but then again, we should cleanup our data and have a mapping for all values.
  // (This happens, because we don't translate all values.)
  // const lastElement =
  //   index === Object.keys(aggregationConfig[aggregationKey].buckets).length - 1;

  // TODO, should we need this, we need to fix it
  const resultTotal = paginationTotal;
  const resultDiff = 0; // parseInt(bucket?.doc_count, 10) - paginationTotal;
  const resultFuture = parseInt(bucket?.doc_count, 10);

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
      onMouseOver={() =>
        console.log({ resultTotal, resultDiff, resultFuture, bucket })
      }
      onFocus={() => ''}
      onClick={() =>
        uiCanpress &&
        handleClick({
          aggregationKey,
          selectedBucketKey: bucket.key,
        })
      }
      title={`Ergebnisse ${resultFuture || '–'}`}
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
