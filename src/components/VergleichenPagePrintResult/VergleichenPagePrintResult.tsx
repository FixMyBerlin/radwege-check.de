import React from 'react'
import { SceneImage } from '../ScenesPage'
import { AggregationConfig } from '../ScenesPage/constants'
import { ResultCells } from '../ScenesPage/Results/ResultCells'
import BikeIcon from '../ScenesPage/Results/ResultNumbers/assets/bike-icon.svg'
import CarIcon from '../ScenesPage/Results/ResultNumbers/assets/car-icon.svg'
import PedestrianIcon from '../ScenesPage/Results/ResultNumbers/assets/pedestrian-icon.svg'
import { BarChartAndHeadline } from '../ScenesPage/Results/ResultNumbers/BarChartAndHeadline'
import { Table } from '../ScenesPage/Results/ResultNumbers/Table'
import { ExperimentTextKey } from '../ScenesPage/store'
import { ScenePrimaryProps, SceneSecondaryProps } from '../ScenesPage/types'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  aggregationConfig: AggregationConfig
  experimentTextKey: ExperimentTextKey
}

export const VergleichenPagePrintResult: React.FC<Props> = ({
  scene,
  aggregationConfig,
  experimentTextKey,
}) => {
  const experimentTitle =
    experimentTextKey === 'primary' ? 'Hauptstraße' : 'Nebenstraße'

  return (
    <section className="mb-16 break-inside-avoid-page">
      <div className="relative flex h-32 gap-5">
        <div className="absolute top-1 left-1 rounded bg-white/50 px-1 text-xxs backdrop-blur">
          ID #{scene.sceneId}
        </div>
        <SceneImage
          sceneId={scene.sceneId}
          className="h-full w-1/3 rounded border border-gray-100 object-cover object-bottom"
        />
        <div className="h-full w-full">
          <div className="mb-5 flex flex-row gap-5">
            <Table
              scene={scene}
              visible
              precision={1}
              showPedestrianColumn={false}
              showCarColumn={false}
              hideSecondaryNumber
            />
            <div className="flex flex-row gap-2">
              <BarChartAndHeadline
                icon={<BikeIcon className="mr-1.5 h-8 w-8" />}
                mainBarChart
                voteScore={scene.voteScore}
                vote0Unsafe={scene.vote0Unsafe}
                vote1RatherUnsafe={scene.vote1RatherUnsafe}
                vote2Save={scene.vote2Save}
                vote3VerySave={scene.vote3VerySave}
              />
              <BarChartAndHeadline
                icon={<PedestrianIcon className="mr-1.5 h-4 w-auto" />}
                voteScore={scene.votePedestrianScore}
                vote0Unsafe={scene.votePedestrian0Unsafe}
                vote1RatherUnsafe={scene.votePedestrian1RatherUnsafe}
                vote2Save={scene.votePedestrian2Save}
                vote3VerySave={scene.votePedestrian3VerySave}
              />
              <BarChartAndHeadline
                icon={<CarIcon className="mr-1.5 h-auto w-5" />}
                voteScore={scene.voteCarScore}
                vote0Unsafe={scene.voteCar0Unsafe}
                vote1RatherUnsafe={scene.voteCar1RatherUnsafe}
                vote2Save={scene.voteCar2Save}
                vote3VerySave={scene.voteCar3VerySave}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <section className="border-b border-dotted border-stone-200 py-1">
          <strong className="text-xxs font-semibold">Straßenklasse</strong>
          <br />
          {experimentTitle}
        </section>
        <ResultCells scene={scene} aggregationConfig={aggregationConfig} />
      </div>
    </section>
  )
}
