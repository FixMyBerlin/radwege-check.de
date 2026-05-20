import clsx from 'clsx'
import React from 'react'

import { SvgInline } from '~/components/Svg/SvgInline'

import { ScenePrimaryProps, SceneSecondaryProps } from '../../../types'
import bikeIconMarkup from '../assets/bike-icon.svg?raw'
import carIconMarkup from '../assets/car-icon.svg?raw'
import pedestrianIconMarkup from '../assets/pedestrian-icon.svg?raw'
import { barColor, barTitle } from '../utils'
import { data, dataSecondary } from './data'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  visible: boolean
  precision?: 0 | 1 | 2
  showPedestrianColumn?: boolean
  showCarColumn?: boolean
  hideSecondaryNumber?: boolean
}

export const Table = ({
  scene,
  visible,
  precision = 2,
  showPedestrianColumn: _showPedestrianColumn,
  showCarColumn: _showCarColumn,
  hideSecondaryNumber = false,
}: Props) => {
  const table = {
    ...data(scene, precision),
    ...(!hideSecondaryNumber && dataSecondary(scene, precision)),
  }

  if (!visible) return null

  const showPedestrianColumn =
    _showPedestrianColumn !== false ? !!table.vote0Unsafe.pedestrian : false
  const showCarColumn = _showCarColumn !== false ? !!table.vote0Unsafe.car : false

  return (
    <table className="my-2 w-full border-b border-dotted border-stone-200 text-xs">
      <caption className="sr-only">Die genauen Umfrageergebnisse für diese Szene</caption>
      <thead>
        <tr>
          <th>
            <span className="sr-only">Kategorie</span>
          </th>
          <th className="border-b border-stone-200 pb-0.5 pr-2 text-center align-bottom">
            <span className="sr-only">Perspektive Fahrrad</span>
            <SvgInline src={bikeIconMarkup} className="inline h-4 w-auto" aria-hidden />
          </th>
          {showPedestrianColumn && (
            <th className="border-b border-stone-200 pb-0.5 pr-2 text-center align-bottom">
              <span className="sr-only">Perspektive Fußgänger</span>
              <SvgInline src={pedestrianIconMarkup} className="inline h-4 w-auto" aria-hidden />
            </th>
          )}
          {showCarColumn && (
            <th className="border-b border-stone-200 pb-0.5 pr-2 text-center align-bottom">
              <span className="sr-only">Perspektive Auto</span>
              <SvgInline src={carIconMarkup} className="inline h-auto w-6" aria-hidden />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(table).map(([key, values]) => {
          return (
            <tr
              key={key}
              className={clsx(
                values.divideTop ? 'border-dashed' : 'border-dotted',
                'border-t border-stone-200 hover:bg-stone-50',
              )}
            >
              <th
                className={clsx('text-left font-semi font-semibold leading-3', {
                  'pt-2': values.divideTop,
                })}
              >
                {barColor[key] && (
                  <span
                    className="mr-1 inline-flex h-2 w-2 cursor-help content-center items-center rounded-full print:hidden"
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
                <span dangerouslySetInnerHTML={{ __html: barTitle[key] }} />
              </th>
              <td
                className={clsx(
                  'w-1/5 pr-2 text-right',
                  {
                    'pt-2': values.divideTop,
                  },
                  { 'font-semibold': key === 'score' },
                )}
              >
                {values.bike}
              </td>
              {showPedestrianColumn ? (
                <td
                  className={clsx(
                    'w-1/5 pr-2 text-right',
                    {
                      'pt-2': values.divideTop,
                    },
                    { 'font-semibold': key === 'score' },
                  )}
                >
                  {values.pedestrian}
                </td>
              ) : null}
              {showCarColumn ? (
                <td
                  className={clsx(
                    'w-1/5 pr-2 text-right',
                    {
                      'pt-2': values.divideTop,
                    },
                    { 'font-semibold': key === 'score' },
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
