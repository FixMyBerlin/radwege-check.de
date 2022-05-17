import { formatNumber } from './formatNumber';

type Props = { precision?: number };

// Default unit has a non breaking space as special space character.
export const formatPercent = (value: number, { precision = 2 }: Props) => {
  return formatNumber(value, { precision, unit: ' %' });
};
