import React from 'react';
import { ResultProps, SearchOptionProps } from '../types';
import { Result } from './Result';

type Props = {
  results: ResultProps;
  searchOptionFilters: SearchOptionProps;
};

export const Results: React.FC<Props> = ({ results, searchOptionFilters }) => {
  const resultItems = results?.data?.items || [];

  return (
    <section className="absolute top-8 bottom-0 left-80 right-0 overflow-scroll p-4">
      <div className="flex flex-row gap-4">
        {resultItems.map((scene) => (
          <Result
            key={scene.sceneId}
            scene={scene}
            searchOptionFilters={searchOptionFilters}
          />
        ))}
      </div>
    </section>
  );
};
