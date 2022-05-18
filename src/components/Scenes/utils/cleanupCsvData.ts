import { ResultItemProps } from '../types';

/**
 * We paste the data from our Google Spreadsheet CSV export without further cleanup.
 * That makes for an easy update process from Spreadsheet to Gatsby.
 * This helper will cleanup the bad data types for undefined and number data.
 */
export const cleanupCsvData = (input): ResultItemProps[] => {
  const filtered = input.filter((scene) => scene.pointOfView === 'bicycle');

  const cleaned = [];
  filtered.forEach((row, index) =>
    Object.entries(row).forEach(([key, value]) => {
      // Prefill with what we have, maybe overwrite it next…
      cleaned[index] ||= {};
      cleaned[index][key] = value;

      // Change value `""` to `undefined`
      if (value === '') {
        cleaned[index][key] = undefined;
      }

      // Change values `"1,0"` to number values `1.0`
      if (
        typeof cleaned[index][key] === 'string' &&
        (key.includes('vote') ||
          key.includes('Count') ||
          key.includes('Means') ||
          key.includes('WidthNumber'))
      ) {
        cleaned[index][key] = parseFloat(cleaned[index][key].replace(',', '.'));
      }

      // Change values `"true"` to boolean values `true`
      //  => This is a bad idea; it causes issues with the loockup of data based on the boolean key.
      // if (typeof cleaned[index][key] === 'string' && key.includes('Has')) {
      //   cleaned[index][key] = key === 'true';
      // }
    })
  );

  // console.log({
  //   in: input[0],
  //   flat: flattened[0],
  //   filt: filtered[0],
  //   clean: cleaned[0],
  // });
  // console.table(filtered[0]);
  // console.table(cleaned[0]);
  return cleaned;
};
