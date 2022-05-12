import React from 'react';
import { ResultProps, SearchOptionProps } from '../types';
import { ResultColumn } from './ResultColumn';

type Props = {
  results: ResultProps;
  searchOptionFilters: SearchOptionProps['filters'];
};

export const Results: React.FC<Props> = ({ results, searchOptionFilters }) => {
  const resultItems = results?.data?.items || [];

  return (
    <div className="absolute right-0 top-16 bottom-0 left-72 z-0 flex flex-row gap-4  overflow-scroll p-4">
      {resultItems.map((scene, index) => (
        <ResultColumn
          key={scene.sceneId}
          scene={scene}
          index={index}
          searchOptionFilters={searchOptionFilters}
        />
      ))}
    </div>
  );
};
