import React from 'react';
import { aggregationConfig } from '../../constants';
import { ResultBucketProps } from '../../types';
import { buttonClassNames } from '../utils';
import { HandleSingleChoice } from './ButtonSingleChoice';

type Props = {
  aggregationKey: string;
  bucketKey: string;
  buckets: ResultBucketProps[];
  handleClick: HandleSingleChoice;
};

export const ButtonSingleChoiceBoth: React.FC<Props> = ({
  aggregationKey,
  bucketKey,
  buckets,
  handleClick,
}) => {
  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const uiSelected = !anyOfGroupSelected;
  const uiCanpress = anyOfGroupSelected;
  const firstElement = true;
  const lastElement = false;

  return (
    <button
      key={`${aggregationKey}__${bucketKey}`}
      type="button"
      className={buttonClassNames({
        firstElement,
        lastElement,
        uiSelected,
        uiCanpress,
      })}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: null,
        })
      }
      disabled={!uiCanpress}
      title=""
    >
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucketKey] || 'TODO',
        }}
      />
    </button>
  );
};
