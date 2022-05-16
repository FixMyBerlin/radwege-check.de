import React, { useState } from 'react';
import { Link } from '~/components/Link';
import { SceneImage } from '../../SceneImage';
import { ResultItemProps, SearchOptionProps } from '../../types';
import { Bookmark } from '../bookmark/Bookmark';
import { ResultCells } from '../ResultCells';
import { ResultStackedBarchart } from '../ResultStackedBarchart';

export type PrevBucketValues = { [key: string]: string | number };

type Props = {
  scene: ResultItemProps;
  index?: number;
  searchOptionFilters?: SearchOptionProps['filters'];
};

export const ResultColumn: React.FC<Props> = ({
  scene,
  index = 0,
  searchOptionFilters = {},
}) => {
  const [sceneImage, setSceneImage] = useState(scene.sceneId);
  const handleImageChange = (sceneId: string) => setSceneImage(sceneId);

  return (
    <article className="h-full w-48 flex-none">
      <h2 className="sr-only">
        <Link to={scene.path as string}>Szene {scene.sceneId}</Link>
      </h2>

      <section className="relative mb-2">
        <Bookmark active />
        {/* todo types */}
        <SceneImage
          sceneId={sceneImage as string}
          className="h-36 w-full object-cover object-bottom"
          lazy={index > 10}
        />
      </section>

      <div className="h-28">
        <ResultStackedBarchart scene={scene} handleHover={handleImageChange} />
      </div>

      <ResultCells scene={scene} searchOptionFilters={searchOptionFilters} />

      <section className="py-3">
        {/* todo types */}
        <Link button blank to={scene.path as string}>
          Details
        </Link>
      </section>
    </article>
  );
};
