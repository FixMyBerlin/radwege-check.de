import React from 'react';
import { Link } from '~/components/Link';
import { aggregationConfig } from '../../constants';
import { SceneImage } from '../../SceneImage';
import { ResultItemProps, SearchOptionProps } from '../../types';
import { Bookmark } from '../bookmark/Bookmark';
import { ResultCell } from '../ResultCell';
import { ResultOtherScenes } from '../ResultOtherScenes';
import { ResultStackedBarchart } from '../ResultStackedBarchart';

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
    <article className="h-full w-48 flex-none" key={scene.sceneId}>
      <h2 className="sr-only">
        <Link to={scene.path as string}>Szene {scene.sceneId}</Link>
      </h2>
      <section className="relative">
        <Bookmark active />
        {/* todo types */}
        <SceneImage
          sceneId={scene.sceneId as string}
          className="h-36 w-full object-cover object-bottom"
        />
      </section>

      <ResultStackedBarchart scene={scene} />

      <ResultOtherScenes scene={scene} />

      {Object.keys(aggregationConfig).map((key) => {
        const bucketActive = searchOptionFilters && !!searchOptionFilters[key];

        return (
          <ResultCell
            key={key}
            keyName={key}
            scene={scene}
            bucketActive={bucketActive}
            groupEndIndicator={aggregationConfig[key]?.groupEndIndicator}
          />
        );
      })}

      <section className="py-3">
        {/* todo types */}
        <Link button blank to={scene.path as string}>
          Details
        </Link>
      </section>
    </article>
  );
};
