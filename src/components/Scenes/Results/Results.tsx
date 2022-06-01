import React from 'react';
import { ResultProps, SceneCategory, SearchOptionProps } from '../types';
import { ResultColumn } from './ResultColumn';

type Props = {
  category: SceneCategory;
  results: ResultProps;
  searchFilters: SearchOptionProps['filters'];
};

export const Results: React.FC<Props> = ({
  category,
  results,
  searchFilters,
}) => {
  const resultItems = results?.data?.items || [];

  return (
    <div className="z-0 flex h-full flex-grow snap-x snap-proximity flex-row overflow-scroll overscroll-contain py-4">
      {resultItems.map((scene, index) => (
        <ResultColumn
          category={category}
          key={scene.sceneId}
          scene={scene}
          index={index}
          searchFilters={searchFilters}
        />
      ))}
    </div>
  );
};
