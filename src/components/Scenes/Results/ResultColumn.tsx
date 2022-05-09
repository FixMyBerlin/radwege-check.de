import React from 'react';
import { Link } from '~/components/Link';
import { SceneImage } from '../SceneImage/SceneImage';
import { ResultItemProps, SearchOptionProps } from '../types';
import { Bookmark } from './Bookmark';
import { ResultCell } from './ResultCell';
import { ResultOtherScenes } from './ResultOtherScenes';
import { ResultStackedBarchart } from './ResultStackedBarchart';

export type PrevBucketValues = { [key: string]: string | number };

type Props = {
  scene: ResultItemProps;
  searchOptionFilters: SearchOptionProps['filters'];
};

export const ResultColumn: React.FC<Props> = ({
  scene,
  searchOptionFilters,
}) => {
  return (
    <div
      className="flex h-full w-48 flex-none flex-col space-y-3"
      key={scene.sceneId}
    >
      <div className="relative">
        <Bookmark active />
        {/* todo types */}
        <SceneImage
          sceneId={scene.sceneId as string}
          className="h-36 w-full object-cover object-bottom"
        />
      </div>

      <ResultStackedBarchart scene={scene} />

      <ResultOtherScenes scene={scene} />

      {Object.keys(scene)
        .filter(
          (key) => !['_id', 'pointOfView', 'path', 'location'].includes(key)
        )
        .filter((key) => !key.startsWith('vote'))
        .filter((key) => !key.startsWith('sceneId'))
        .filter((key) => !key.endsWith('WidthNumber'))
        .map((key) => {
          const bucketActive =
            searchOptionFilters && !!searchOptionFilters[key];

          return (
            <ResultCell
              key={key}
              keyName={key}
              bucketActive={bucketActive}
              scene={scene}
            />
          );
        })}

      <div>
        {/* todo types */}
        <Link to={scene.path as string}>Details</Link>
      </div>
    </div>
  );
};
