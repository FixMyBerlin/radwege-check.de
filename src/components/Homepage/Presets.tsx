import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from '../Link';
import {
  presetsScenesSecondary,
  presetsScenesPrimary,
} from '../Scenes/constants/presets.const';
import { PresetSlider } from './PresetSlider';

export type FilterUrlProp = `/${'hauptstrassen' | 'nebenstrassen'}/?filter=`;

type FilterUrlBySceneCategory = {
  primary: FilterUrlProp;
  secondary: FilterUrlProp;
};

export const Presets: React.FC = () => {
  type SceneCategory = 'primary' | 'secondary';
  const [sceneCategory, setSceneCategory] = useState<SceneCategory>('primary');
  const scenesBySceneCategory = {
    primary: presetsScenesPrimary,
    secondary: presetsScenesSecondary,
  };
  const allButtonBySceneCategory = {
    primary: { url: '/hauptstrassen/', total: 1700 },
    secondary: { url: '/nebenstrassen/', total: 123 },
  };
  const filterUrlBySceneCategory: FilterUrlBySceneCategory = {
    primary: '/hauptstrassen/?filter=',
    secondary: '/nebenstrassen/?filter=',
  };

  const tabActive = (category: SceneCategory) => category === sceneCategory;

  const pickTabClasses = (category: SceneCategory) => {
    return tabActive(category)
      ? 'h-full w-full p-3 font-semibold'
      : classNames(
          'h-full w-full bg-[#fff8e8] p-3 hover:underline font-semibold',
          tabActive('primary') ? 'rounded-bl-md' : 'rounded-br-md'
        );
  };

  return (
    <section className="bg-[#fff8e8] pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between">
          <div className="flex-grow bg-stone-300">
            <h2
              className={classNames(
                'w-full bg-[#fff8e8] py-3 text-2xl font-semibold',
                {
                  'rounded-br-md': tabActive('primary'),
                }
              )}
            >
              Welche Radwege willst du vergleichen?
            </h2>
          </div>
          <nav className="flex">
            <div
              className={classNames(
                { 'rounded-t-md': tabActive('primary') },
                'bg-stone-300'
              )}
            >
              <button
                type="button"
                disabled={tabActive('primary')}
                className={pickTabClasses('primary')}
                onClick={() => setSceneCategory('primary')}
              >
                Hauptstraße
              </button>
            </div>
            <div
              className={classNames(
                { 'rounded-t-md': tabActive('secondary') },
                'bg-stone-300'
              )}
            >
              <button
                type="button"
                disabled={tabActive('secondary')}
                className={pickTabClasses('secondary')}
                onClick={() => setSceneCategory('secondary')}
              >
                Nebenstraße
              </button>
            </div>
          </nav>
        </div>
        <PresetSlider
          className={classNames('rounded-md', {
            'rounded-md rounded-tr-none': tabActive('secondary'),
          })}
          slides={scenesBySceneCategory[sceneCategory]}
          filterUrl={filterUrlBySceneCategory[sceneCategory]}
        />
        <p>
          <Link button to={allButtonBySceneCategory[sceneCategory].url}>
            Alle {allButtonBySceneCategory[sceneCategory].total} Ergebnisse
          </Link>
        </p>
      </div>
    </section>
  );
};
