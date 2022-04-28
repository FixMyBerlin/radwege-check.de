type Props = { precision?: number; unit?: string; delimiter?: string };

// Default unit has a non breaking space as special space character.
export const formatNumber = (
  value: number | string,
  { precision = 2, unit = '', delimiter = ',' }: Props
) => {
  // Tranform stings to float and for that, transform 1,1 to 1.1 first.
  const input =
    typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  // console.log({
  //   value,
  //   type: typeof value,
  //   parsed: input,
  //   formatted: input.toFixed(precision),
  // });

  // Note this replace will break once we also want 1.000,00 formats.
  return `${input.toFixed(precision)}${unit}`.replace('.', delimiter);
};
