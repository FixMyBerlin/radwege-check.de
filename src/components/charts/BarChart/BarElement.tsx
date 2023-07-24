import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

const colorScale = ['#c01d1d', '#f08141', '#abc759', '#45b834']
const colorWeight = ['#45b834']
const labels = defineMessages({
  0: {
    id: 'barchart.labels.unsafe',
    defaultMessage: 'unsicher',
  },
  1: {
    id: 'barchart.labels.ratherUnsafe',
    defaultMessage: 'eher unsicher',
  },
  2: {
    id: 'barchart.labels.ratherSafe',
    defaultMessage: 'eher sicher',
  },
  3: {
    id: 'barchart.labels.safe',
    defaultMessage: 'sicher',
  },
})

const getColor = (isWeightGraph: boolean, index: number) =>
  isWeightGraph ? colorWeight[index] : colorScale[index]

const BarLabel = ({ value, isWeightGraph }) => {
  const intl = useIntl()

  if (isWeightGraph) {
    return (
      <div className="absolute -right-10 font-semibold text-gray-800">
        {(value / 100.0).toLocaleString(intl.locale, {
          maximumFractionDigits: 2,
        })}
      </div>
    )
  }

  return (
    <div className="font-bold text-white">
      {value < 15
        ? '*'
        : `${value.toLocaleString(intl.locale, { maximumFractionDigits: 0 })}%`}
    </div>
  )
}

const Tooltip = ({ id, children }) => {
  return (
    <div
      id={id}
      role="tooltip"
      className="absolute -bottom-8 left-0 whitespace-nowrap font-condensed text-lg text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      {children}
    </div>
  )
}

export const BarElement = ({ title, value, index, isWeightGraph = false }) => {
  const intl = useIntl()
  const pctValue = value.toLocaleString(intl.locale, {
    maximumFractionDigits: 2,
  })
  const tooltipId = `barchart-tooltip-${encodeURIComponent(
    title,
  )}-${index}-${pctValue}`

  // `overflow-hidden` fixes Tooltip on mobile. It cannot be accessed on touch anyway, so no one will see the cut of text.
  return (
    <div
      className={clsx(
        'group relative flex cursor-help items-center justify-center',
        { 'overflow-hidden': !isWeightGraph },
      )}
      key={`bar__${labels[index]}`}
      style={{
        width: `${value}%`,
        backgroundColor: getColor(isWeightGraph, index),
      }}
      aria-describedby={isWeightGraph ? null : tooltipId}
    >
      <BarLabel value={value} isWeightGraph={isWeightGraph} />
      {!isWeightGraph && (
        <Tooltip id={tooltipId}>
          {pctValue}% {intl.formatMessage(labels[index])}
        </Tooltip>
      )}
    </div>
  )
}
