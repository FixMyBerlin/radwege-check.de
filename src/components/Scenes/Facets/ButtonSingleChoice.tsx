import classNames from 'classnames';
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

  const resultTotal = paginationTotal;
  const resultDiff = resultTotal - parseInt(bucket?.doc_count, 10) || 0;
  const resultFuture = parseInt(bucket?.doc_count, 10) || 0;

  const uiSelected = bucket?.selected;
  const uiCanpress = !bucket?.selected;
  const uiCanpressTEST =
    !bucket?.selected && (resultFuture !== 0 || resultDiff !== 0);
  const firstElement = index === 0;
  const lastElement = index === buckets.length;

  return (
    <button
      key={bucket.key}
      type="button"
      className={classNames(
        buttonClassNames({
          firstElement,
          lastElement,
          uiSelected,
          uiCanpress,
        }),
        { '!text-red-300': uiCanpress }
      )}
      onMouseOver={() =>
        console.log({
          resultTotal,
          resultDiff,
          resultFuture,
          bucket,
          uiSelected,
          uiCanpress,
          uiCanpressTEST,
        })
      }
      onFocus={() => ''}
      onClick={() =>
        uiCanpress &&
        handleClick({
          aggregationKey,
          selectedBucketKey: bucket.key,
        })
      }
      title={`Ergebnisse ${resultFuture}`}
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
