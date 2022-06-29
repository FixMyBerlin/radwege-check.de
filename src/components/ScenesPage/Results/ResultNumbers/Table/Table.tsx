import classNames from 'classnames'
import React from 'react'
import { ScenePrimaryProps, SceneSecondaryProps } from '../../../types'
import { barColor, barTitle } from '../utils'
import BikeIcon from '../assets/bike-icon.svg'
import CarIcon from '../assets/car-icon.svg'
import PedestrianIcon from '../assets/pedestrian-icon.svg'
import { data } from './data'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  visible: boolean
  precision?: 0 | 1 | 2
}

export const Table: React.FC<Props> = ({ scene, visible, precision = 2 }) => {
  const table = data(scene, precision)

  if (!visible) return null

  const showPedestrianColumn = !!table.vote0Unsafe.pedestrian
  const showCarColumn = !!table.vote0Unsafe.car

  return (
    <table className="my-2 w-full border-b border-dotted border-stone-200 text-xs">
      <caption className="sr-only">
        Die genauen Umfrageergebnisse für diese Szene
      </caption>
      <thead>
        <tr>
          <th> </th>
          <th className="border-b border-stone-200 pr-2 pb-0.5 text-center align-bottom">
            <span className="sr-only">Perspektive Fahrrad</span>
            <BikeIcon className="inline h-4 w-auto" />
          </th>
          {showPedestrianColumn && (
            <th className="border-b border-stone-200 pr-2 pb-0.5 text-center align-bottom">
              <span className="sr-only">Perspektive Fußgänger</span>
              <PedestrianIcon className="inline h-4 w-auto" />
            </th>
          )}
          {showCarColumn && (
            <th className="border-b border-stone-200 pr-2 pb-0.5 text-center align-bottom">
              <span className="sr-only">Perspektive Auto</span>
              <CarIcon className="inline h-auto w-6" />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(table).map(([key, values]) => {
          return (
            <tr
              key={key}
              className={classNames(
                values.divideTop ? 'border-dashed' : 'border-dotted',
                'border-t border-stone-200 hover:bg-stone-50'
              )}
            >
              <th
                className={classNames(
                  'text-left font-semi font-semibold leading-3',
                  { 'pt-2': values.divideTop }
                )}
              >
                {barColor[key] && (
                  <span
                    className="mr-1 inline-flex h-2 w-2 cursor-help content-center items-center rounded-full"
                    style={{
                      backgroundColor: barColor[key],
                      color: barColor[key],
                    }}
                    title="Farbe im Diagramm"
                    aria-hidden="true"
                  >
                    ・
                  </span>
                )}
                <span
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: barTitle[key] }}
                />
              </th>
              <td
                className={classNames(
                  'w-1/5 pr-2 text-right',
                  {
                    'pt-2': values.divideTop,
                  },
                  { 'font-semibold': key === 'score' }
                )}
              >
                {values.bike}
              </td>
              {showPedestrianColumn ? (
                <td
                  className={classNames(
                    'w-1/5 pr-2 text-right',
                    {
                      'pt-2': values.divideTop,
                    },
                    { 'font-semibold': key === 'score' }
                  )}
                >
                  {values.pedestrian}
                </td>
              ) : null}
              {showCarColumn ? (
                <td
                  className={classNames(
                    'w-1/5 pr-2 text-right',
                    {
                      'pt-2': values.divideTop,
                    },
                    { 'font-semibold': key === 'score' }
                  )}
                >
                  {values.car}
                </td>
              ) : null}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
