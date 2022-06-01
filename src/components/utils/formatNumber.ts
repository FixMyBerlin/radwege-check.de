type Props =
  | { precision?: number; unit?: string; delimiter?: string }
  | undefined;

// Default unit has a non breaking space as special space character.
export const formatNumber = (
  value: number | undefined,
  { precision = 2, unit = '', delimiter = ',' }: Props
) => {
  if (typeof value === 'undefined') return null;

  // Note this replace will break once we also want 1.000,00 formats.
  return `${value.toFixed(precision)}${unit}`.replace('.', delimiter);
};
