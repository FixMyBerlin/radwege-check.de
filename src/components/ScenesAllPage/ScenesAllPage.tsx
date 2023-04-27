import React, { useMemo } from 'react'
import { useStore } from 'zustand'
import { FeelSafe } from '../charts'
import { MetaTags } from '../Layout'
import { Link } from '../Link'
import { SceneImage } from '../ScenesPage'
import { useStoreExperimentData } from '../ScenesPage/store'
import { cleanupCsvData } from '../ScenesPage/utils'
import { titleScene } from '../ScenesPage/utils/titleScenes'

type Props = {
  rawScenes: any
}

export const ScenesAllPage: React.FC<Props> = ({ rawScenes }) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    const clean = cleanupCsvData(flattened)
    return clean.sort((a, b) => a.voteScore - b.voteScore)
  }, [rawScenes])

  const totalResults = Number(scenes.length).toLocaleString()

  const { experimentTextKey } = useStore(useStoreExperimentData)
  const categoryTranslation =
    experimentTextKey === 'primary' ? 'Hauptstrassen' : 'Nebenstrassen'
  const resultsPath =
    experimentTextKey === 'primary' ? '/hauptstrassen' : '/nebenstrassen'
  const otherCategoryTranslation =
    experimentTextKey === 'primary' ? 'Nebenstrassen' : 'Hauptstrassen'
  const otherResultsPath =
    experimentTextKey === 'primary'
      ? '/nebenstrassen/alle'
      : '/hauptstrassen/alle'

  return (
    <>
      <MetaTags
        article
        noindex
        title={`Alle ${Number(
          totalResults
        ).toLocaleString()} Szenen auf ${categoryTranslation}.`}
        description="Auf Basis eine Umfrage mit über 22.000 Teilnehmenden."
        imagePath="/social-sharing/results.jpg"
      />

      <h1 className="mb-5 text-center text-4xl font-semibold">
        Alle {totalResults} Szenen für {categoryTranslation}
      </h1>
      <p className="mb-6 text-center text-gray-500">
        Aus dem Blickwinkel einer Fahrradfahrer:in. Die Sortierung zeigt die am
        schlechtesten bewerteten Szenen zuerst.
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
