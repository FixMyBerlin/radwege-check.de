type Props = { value: number | string; precision?: number; unit?: string };

// Default unit has a non breaking space as special space character.
export const formatPercent = ({ value, precision = 2, unit = ' %' }: Props) => {
  // Tranform stings to float and for that, transform 1,1 to 1.1 first.
  const input =
    typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  // console.log({
  //   value,
  //   type: typeof value,
  //   parsed: input,
  //   formatted: input.toFixed(precision),
  // });

  return `${input.toFixed(precision)}${unit}`;
};
