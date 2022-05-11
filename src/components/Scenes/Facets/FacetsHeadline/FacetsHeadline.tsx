import classNames from 'classnames';
import React from 'react';
import { TranslationMissing } from '~/components/TextHelper';
import { aggregationConfig } from '../../constants';

type Props = {
  visible: boolean;
  aggregationKey: string;
};

export const FacetsHeadline: React.FC<Props> = ({
  visible,
  aggregationKey,
}) => {
  const title = aggregationConfig[aggregationKey]?.title;
  const text = title || <TranslationMissing value={aggregationKey} />;

  return (
    <h2
      title={aggregationKey}
      className={classNames('mb-1 text-sm font-semibold', {
        'sr-only': !(visible && title),
      })}
    >
      {text}
    </h2>
  );
};
