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
  if (!visible) return null;

  return (
    <h5 title={aggregationKey} className="mb-1 text-base font-semibold">
      {aggregationConfig[aggregationKey]?.title || (
        <TranslationMissing value={aggregationKey} />
      )}
    </h5>
  );
};
