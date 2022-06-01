import React, { useState } from 'react';
import { Link } from '~/components/Link';
import { SceneImage } from '../../SceneImage';
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
  SceneCategory,
  SearchOptionProps,
} from '../../types';
import { ResultCells } from '../ResultCells';
import { ResultStackedBarchart } from '../ResultStackedBarchart';

export type PrevBucketValues = { [key: string]: string | number };

type Props = {
  category: SceneCategory;
  scene: ScenePrimaryProps | SceneSecondaryProps;
  index?: number;
  searchFilters?: SearchOptionProps['filters'];
};

export const ResultColumn: React.FC<Props> = ({
  category,
  scene,
  index = 0,
  searchFilters = {},
}) => {
  const [sceneImage, setSceneImage] = useState(scene.sceneId);
  const handleImageChange = (sceneId: string) => setSceneImage(sceneId);

  return (
    <article className="box-content h-full w-56 flex-none snap-start py-4 px-1.5 first:pl-4 lg:w-48 lg:px-2">
      <h2 className="sr-only">
        <Link to={scene.path}>Szene {scene.sceneId}</Link>
      </h2>

      <section className="mb-2">
        <Link to={scene.path} blank classNameOverwrite="relative">
          <SceneImage
            sceneId={sceneImage}
            className="h-36 w-full object-cover object-bottom"
            lazy={index > 10}
          />
        </Link>
      </section>

      <div className="mb-1 h-28">
        <ResultStackedBarchart scene={scene} handleHover={handleImageChange} />
      </div>

      <ResultCells
        category={category}
        scene={scene}
        searchFilters={searchFilters}
      />

      <section className="py-3">
        <Link button blank to={scene.path}>
          Details
        </Link>
      </section>
    </article>
  );
};
