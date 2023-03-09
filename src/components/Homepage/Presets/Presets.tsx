import clsx from 'clsx'
import React, { useState } from 'react'
import { Link } from '../../Link'
import {
  presetsScenesPrimary,
  presetsScenesSecondary,
} from '../../ScenesPage/constants'
import { SceneCategory } from '../../ScenesPage/types'
import { PresetSlider } from './PresetSlider'

export const Presets: React.FC = () => {
  const [sceneCategory, setSceneCategory] = useState<SceneCategory>('primary')
  const scenesBySceneCategory = {
    primary: presetsScenesPrimary,
    secondary: presetsScenesSecondary,
  }
  const allButtonBySceneCategory = {
    primary: { url: '/hauptstrassen/', total: 1700 },
    secondary: { url: '/nebenstrassen/', total: 78 },
  }

  const tabActive = (category: SceneCategory) => category === sceneCategory

  const pickTabClasses = (category: SceneCategory) => {
    return tabActive(category)
      ? 'h-full w-full p-3 font-semibold'
      : clsx(
          'h-full w-full bg-brand-light-yellow p-3 hover:underline font-semibold',
          tabActive('primary') ? 'rounded-bl-md' : 'rounded-br-md'
        )
  }

  return (
    <section className="bg-brand-light-yellow px-4 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-end md:flex-row md:justify-between">
          <div className="flex-grow bg-stone-200">
            <h2
              className={clsx(
                'w-full bg-brand-light-yellow py-3 text-2xl font-semibold',
                {
                  'rounded-br-md': tabActive('primary'),
                }
              )}
            >
              Welche Radwege willst du vergleichen?
            </h2>
          </div>
          <nav className="flex w-full justify-center sm:w-auto sm:justify-end">
            <div
              className={clsx(
                { 'rounded-t-md': tabActive('primary') },
                'bg-stone-200'
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
              className={clsx(
                { 'rounded-t-md': tabActive('secondary') },
                'bg-stone-200'
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
          className={clsx('sm:rounded-md', {
            'sm:rounded-md sm:rounded-tr-none': tabActive('secondary'),
          })}
          slides={scenesBySceneCategory[sceneCategory]}
          sceneCategory={sceneCategory}
        />
        <p>
          <Link
            button
            to={allButtonBySceneCategory[sceneCategory].url}
            classNameOverwrite="inline-flex items-center px-4 py-2 border border-transparent font-semibold rounded-md shadow-sm text-gray-800 bg-white border-gray-400 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
          >
            Alle{' '}
            {Number(
              allButtonBySceneCategory[sceneCategory].total
            ).toLocaleString()}{' '}
            Ergebnisse
          </Link>
        </p>
      </div>
    </section>
  )
}
