import React from 'react';
import { aggregationConfig } from '../../constants';
import { ResultItemProps, SearchOptionProps } from '../../types';
import { ResultCell } from './ResultCell';

type Props = {
  scene: ResultItemProps;
  searchFilters?: SearchOptionProps['filters'];
};

export const ResultCells: React.FC<Props> = ({ scene, searchFilters }) => {
  return (
    <>
      {Object.keys(aggregationConfig).map((key) => {
        const bucketActive = searchFilters && !!searchFilters[key];

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
