import React from 'react';
import { useAggregationConfig } from '../../hooks';
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
  SceneCategory,
  SearchOptionProps,
} from '../../types';
import { ResultCell } from './ResultCell';

type Props = {
  category: SceneCategory;
  scene: ScenePrimaryProps | SceneSecondaryProps;
  searchFilters?: SearchOptionProps['filters'];
};

export const ResultCells: React.FC<Props> = ({
  category,
  scene,
  searchFilters,
}) => {
  const aggregationConfig = useAggregationConfig(category);

  return (
    <>
      {Object.keys(aggregationConfig).map((key) => {
        const bucketActive = searchFilters && !!searchFilters[key];

        return (
          <ResultCell
            category={category}
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
