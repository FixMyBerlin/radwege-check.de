import clsx from 'clsx'
import React from 'react'
import { ScenePrimaryProps, SceneSecondaryProps } from '../../types'
import { ShowTableProps } from '../Results'
import BikeIcon from './assets/bike-icon.svg'
import CarIcon from './assets/car-icon.svg'
import PedestrianIcon from './assets/pedestrian-icon.svg'
import { BarChartAndHeadline } from './BarChartAndHeadline'
import { HeadlineButton } from './HeadlineButton'
import { ScoreExplanation } from './ScoreExplanation'
import { Table } from './Table'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  /** @desc `null` to disable */
  handleHover: (sceneId: string) => void | null
  wrapperClass?: string
  chartClass?: string
} & ShowTableProps

export const ResultNumbers: React.FC<Props> = ({
  scene,
  handleHover,
  showTable,
  setShowTable,
  wrapperClass,
  chartClass,
}) => {
  return (
    <section
      className={clsx(
        wrapperClass,
        'flex flex-col print:flex-row print:justify-between print:gap-3',
      )}
    >
      <div>
        <HeadlineButton
          visible={setShowTable !== null}
          showTable={showTable}
          setShowTable={setShowTable}
          scene={scene}
        />
        <Table scene={scene} visible={showTable} precision={1} />
        <ScoreExplanation visible={showTable} scene={scene} />
      </div>

      <div
        className={clsx(
          chartClass,
          'relative flex h-full flex-row gap-1 text-xs print:h-auto',
        )}
      >
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
          handleMouseOver={
            handleHover && (() => handleHover(scene.sceneIdPedestrian))
          }
          handleMouseOut={handleHover && (() => handleHover(scene.sceneId))}
        />
        <BarChartAndHeadline
          icon={<CarIcon className="mr-1.5 h-auto w-5" />}
          voteScore={scene.voteCarScore}
          vote0Unsafe={scene.voteCar0Unsafe}
          vote1RatherUnsafe={scene.voteCar1RatherUnsafe}
          vote2Save={scene.voteCar2Save}
          vote3VerySave={scene.voteCar3VerySave}
          handleMouseOver={handleHover && (() => handleHover(scene.sceneIdCar))}
          handleMouseOut={handleHover && (() => handleHover(scene.sceneId))}
        />
      </div>
    </section>
  )
}
