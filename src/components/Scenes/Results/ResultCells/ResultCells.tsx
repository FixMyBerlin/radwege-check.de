import React from 'react';
import { aggregationConfig } from '../../constants';
import { ResultItemProps, SearchOptionProps } from '../../types';
import { ResultCell } from './ResultCell';

type Props = {
  scene: ResultItemProps;
  searchOptionFilters?: SearchOptionProps['filters'];
};

export const ResultCells: React.FC<Props> = ({
  scene,
  searchOptionFilters,
}) => {
  return (
    <>
      {Object.keys(aggregationConfig).map((key) => {
        const bucketActive = searchOptionFilters && !!searchOptionFilters[key];

        return (
          <ResultCell
            key={key}
            keyName={key}
            scene={scene}
            bucketActive={bucketActive}
            groupEndIndicator={aggregationConfig[key]?.groupEndIndicator}
            showIcon={aggregationConfig[key]?.showAsIcons}
          />
        );
      })}
    </>
  );
};
