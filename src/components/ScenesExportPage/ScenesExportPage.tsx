import React, { useMemo, useState } from 'react'
import { MetaTags } from '../Layout'
import { Link, linkStyles } from '../Link'
import { SceneImage } from '../ScenesPage'
import { useAggregationConfig } from '../ScenesPage/hooks'
import { useStoreExperimentData } from '../ScenesPage/store'
import { cleanupCsvData } from '../ScenesPage/utils'
import { titleScene } from '../ScenesPage/utils/titleScenes'

type Props = {
  rawScenes: any
  experimentTextKey: 'primary' | 'secondary'
}

export const ScenesExportPage: React.FC<Props> = ({
  rawScenes,
  experimentTextKey,
}) => {
  const { experimentTextKey: storeExperimentTextKey, setExperimentTextKey } =
    useStoreExperimentData()
  if (!storeExperimentTextKey) setExperimentTextKey(experimentTextKey)

  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    const clean = cleanupCsvData(flattened)
    return clean.sort((a, b) => a.voteScore - b.voteScore)
  }, [rawScenes])

  const totalResults = Number(scenes.length).toLocaleString()

  const categoryTranslation =
    experimentTextKey === 'primary' ? 'Hauptstrassen' : 'Nebenstrassen'
  const otherCategoryTranslation =
    experimentTextKey === 'primary' ? 'Nebenstrassen' : 'Hauptstrassen'
  const otherResultsPath =
    experimentTextKey === 'primary'
      ? '/nebenstrassen/export'
      : '/hauptstrassen/export'

  const fields = Object.keys(scenes[0])
  const aggregationConfig = useAggregationConfig(experimentTextKey)

  const [translateResults, setTranslateResults] = useState(false)

  return (
    <>
      <MetaTags
        article
        noindex
        title={`Export-Ansicht aller ${totalResults} Szenen auf ${categoryTranslation}.`}
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
      <p className="space-x-3 text-center">
        <button
          type="button"
          onClick={() => setTranslateResults((prev) => !prev)}
          className={linkStyles}
        >
          {translateResults
            ? 'Englishe Bezeichnungen anzeigen'
            : 'Deutsche Bezeichnungen anzeigen'}
        </button>
        <Link to={otherResultsPath}>Zu den {otherCategoryTranslation}</Link>
      </p>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Szenentitel
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Illustration
                    </th>
                    {fields.map((field) => {
                      const titleTranslation =
                        aggregationConfig[field]?.resultTitle ||
                        aggregationConfig[field]?.title

                      const displayValue = translateResults
                        ? titleTranslation
                        : field

                      return (
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {displayValue}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {scenes.map((scene) => (
                    <tr key={scene.sceneId}>
                      <th className="min-w-[20rem] py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        <Link to={scene.path}>
                          {titleScene(scene, { experimentTextKey })}
                        </Link>
                      </th>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <SceneImage
                          sceneId={scene.sceneId}
                          className="h-12 rounded object-cover object-bottom"
                        />
                      </td>

                      {fields.map((field) => {
                        const value = scene[field]
                        const isNumber = typeof value === 'number'

                        const bucketTranslation =
                          aggregationConfig[field]?.resultBuckets?.[
                            scene[field]
                          ] || aggregationConfig[field]?.buckets[scene[field]]

                        const displayValue = translateResults
                          ? bucketTranslation
                          : value

                        return (
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {isNumber ? value.toLocaleString() : displayValue}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
