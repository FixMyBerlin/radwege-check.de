import clsx from 'clsx'
import { scaleLinear } from 'd3-scale'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import BikeIcon from './assets/feelsafe-bike-icon.svg'
import CarIcon from './assets/feelsafe-car-icon.svg'
import WalkIcon from './assets/feelsafe-walk-icon.svg'

const scale = scaleLinear(
  [10, 50, 75, 100],
  ['#c01d1d', '#f08141', '#abc759', '#45b834']
)

export const getColorByValue = (index) => {
  return index <= 10 ? '#c01d1d' : scale(index)
}

export type FeelsafeIcon = 'bike' | 'car' | 'walk'

export type FeelSafeProps = {
  value: number
  big?: boolean
  icon?: FeelsafeIcon
}

const modes = defineMessages({
  bike: {
    id: 'feelsafe.perspectives.bike',
    defaultMessage: 'Fahrrad',
  },
  car: {
    id: 'feelsafe.perspectives.car',
    defaultMessage: 'Auto',
  },
  walk: {
    id: 'feelsafe.perspectives.walking',
    defaultMessage: 'Fuß',
  },
})

export const IntlWrappedFeelSafe: React.FC<FeelSafeProps> = ({
  value,
  big,
  icon,
}) => {
  const color = getColorByValue(value)
  const IconComponent = {
    bike: BikeIcon,
    car: CarIcon,
    walk: WalkIcon,
  }[icon]

  const intl = useIntl()

  const valueDisplay = value.toLocaleString(intl.locale, {
    maximumFractionDigits: 0,
  })

  const label = intl.formatMessage(
    {
      id: 'feelsafe.label',
      defaultMessage:
        '{pct}% der Nutzer:innen in der {mode}-Perspektive fühlen sich sicher',
    },
    {
      pct: value.toLocaleString(intl.locale),
      mode: intl.formatMessage(modes[icon]),
    }
  )

  return (
    <div
      className={clsx(
        'relative flex items-center justify-center rounded-full',
        big ? 'w-[120px]' : 'w-[80px]'
      )}
    >
      <svg className="h-full w-full" viewBox="0 0 42 42">
        <title>{label || 'TODO'}</title>
        <circle cx="21" cy="21" r="15.91549430918954" fill="#fff" />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#fff"
          strokeWidth="3"
        />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth="3"
        />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${value} ${100 - value}`}
          strokeDashoffset="25"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <IconComponent
          role="presentation"
          style={{
            width: `${big ? 24 : 18} px`,
            height: `${big ? 14 : 10}px`,
          }}
        />
        <div
          className={clsx('font-bold')}
          style={{
            fontSize: `${big ? 30 : 20}px`,
          }}
        >
          {valueDisplay}%
        </div>
        <div className="text-[8px] text-gray-500">feel safe*</div>
      </div>
    </div>
  )
}
