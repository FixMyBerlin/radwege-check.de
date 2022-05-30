import classNames from 'classnames';
import React from 'react';
import { useAggregationConfig } from '../../hooks';
import { ResultBucketProps, SceneCategory } from '../../types';
import { buttonClassNames } from '../utils';
import { HandleSingleChoice } from './ButtonSingleChoice';

type Props = {
  aggregationKey: string;
  category: SceneCategory;
  bucketKey: string;
  buckets: ResultBucketProps[];
  handleClick: HandleSingleChoice;
};

export const ButtonSingleChoiceBoth: React.FC<Props> = ({
  aggregationKey,
  category,
  bucketKey,
  buckets,
  handleClick,
}) => {
  const aggregationConfig = useAggregationConfig(category);
  const { showAsIcons } = aggregationConfig[aggregationKey];

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
      className={classNames(
        buttonClassNames({
          firstElement,
          lastElement,
          uiSelected,
          uiCanpress,
        }),
        { '!h-8': showAsIcons }
      )}
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
