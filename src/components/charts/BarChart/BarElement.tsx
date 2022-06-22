import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

const colorScale = ['#c01d1d', '#f08141', '#abc759', '#45b834']
const colorWeight = ['#45b834']
const labels = defineMessages({
  0: {
    id: 'research.components.barchart.labels.unsafe',
    defaultMessage: 'unsicher',
  },
  1: {
    id: 'research.components.barchart.labels.ratherUnsafe',
    defaultMessage: 'eher unsicher',
  },
  2: {
    id: 'research.components.barchart.labels.ratherSafe',
    defaultMessage: 'eher sicher',
  },
  3: {
    id: 'research.components.barchart.labels.safe',
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
      className="absolute left-0 -bottom-8 whitespace-nowrap font-condensed text-lg text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
    title
  )}-${index}-${pctValue}`

  return (
    <div
      className="group relative flex cursor-help items-center justify-center"
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
