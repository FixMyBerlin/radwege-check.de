import classNames from 'classnames';
import React from 'react';
import { aggregationConfig } from '../../constants';
import { ResultBucketProps } from '../../types';
import { buttonClassNames } from '../utils';
import { useResults } from './useResults';

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

  const { resultTotal, resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
  });

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
        })
      )}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: bucket.key,
        })
      }
      disabled={!uiCanpress}
      title={
        // eslint-disable-next-line no-nested-ternary
        resultTotal === resultFuture
          ? 'Auswahl nicht möglich da keine Änderung der Ergebnisse.'
          : resultFuture === 0
          ? 'Auswahl nicht möglich da sie zu 0 Ergebnissen führen würde'
          : `Ergebnisse ${resultFuture || 'todo'}`
      }
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
