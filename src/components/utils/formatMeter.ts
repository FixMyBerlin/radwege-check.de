import { formatPercent } from './formatPercent';

type Props = { value: number | string; precision?: number; unit?: string };

export const formatMeter = ({ value, precision = 1, unit = ' m' }: Props) => {
  return formatPercent({ value, precision, unit });
};
