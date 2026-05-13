import React from 'react'

import { FeelSafe } from '../charts'
import { Link } from '../Link'
import { SceneImage } from '../ScenesPage'
import { cleanupCsvData } from '../ScenesPage/utils'
import { titleScene } from '../ScenesPage/utils/titleScenes'

type SceneKind = 'primary' | 'secondary'

type Props = {
  rawScenes: { node: Record<string, unknown> }[] | Record<string, unknown>[]
  sceneKind: SceneKind
}

export const ScenesAllPage = ({ rawScenes, sceneKind }: Props) => {
  const flattened = rawScenes.map((list: any) =>
    list && typeof list === 'object' && 'node' in list ? list.node : list,
  )
  const clean = cleanupCsvData(flattened)
  const base = sceneKind === 'primary' ? '/hauptstrassen' : '/nebenstrassen'
  const scenes = clean
    .sort((a, b) => a.voteScore - b.voteScore)
    .map((s) => ({
      ...s,
      path: `${base}/${s.sceneId}`,
    }))

  const totalResults = Number(scenes.length).toLocaleString()

  const categoryTranslation = sceneKind === 'primary' ? 'Hauptstrassen' : 'Nebenstrassen'
  const resultsPath = sceneKind === 'primary' ? '/hauptstrassen' : '/nebenstrassen'
  const otherCategoryTranslation = sceneKind === 'primary' ? 'Nebenstrassen' : 'Hauptstrassen'
  const otherResultsPath = sceneKind === 'primary' ? '/nebenstrassen/alle' : '/hauptstrassen/alle'

  return (
    <>
      <h1 className="mb-5 text-center text-4xl font-semibold">
        Alle {totalResults} Szenen für {categoryTranslation}
      </h1>
      <p className="mb-6 text-center text-gray-500">
        Aus dem Blickwinkel einer Fahrradfahrer:in. Die Sortierung zeigt die am schlechtesten
        bewerteten Szenen zuerst.
      </p>
      <p className="text-center">
        <Link to={resultsPath} button className="mr-2">
          Ergebnisse filtern
        </Link>{' '}
        <Link to={otherResultsPath}>Zu den {otherCategoryTranslation}</Link>
      </p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {scenes.map((scene) => (
          <Link
            key={scene.sceneId}
            to={scene.path}
            classNameOverwrite="flex flex-col rounded border border-transparent p-3 transition hover:border-gray-100 hover:bg-brand-light-yellow hover:shadow-xl"
          >
            <div className="relative">
              <SceneImage
                sceneId={scene.sceneId}
                className="mb-2 rounded object-cover object-bottom"
              />
              <div className="absolute right-1 top-1">
                <FeelSafe value={scene.voteScore} standalone big />
              </div>
            </div>

            <h2 className="leading-tight">{titleScene(scene)}</h2>
          </Link>
        ))}
      </div>
    </>
  )
}
