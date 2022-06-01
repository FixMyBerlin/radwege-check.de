import { formatNumber } from './formatNumber'

type Props = { precision?: number } | undefined

// Default unit has a non breaking space as special space character.
export const formatPercent = (
  value: number | undefined,
  { precision = 2 }: Props
) => {
  return formatNumber(value, { precision, unit: ' %' })
}
