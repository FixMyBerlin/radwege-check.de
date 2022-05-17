export const cleanupCsvData = (input) => {
  const flattened = input.map((list) => list.node);

  const filtered = flattened.filter((scene) => scene.pointOfView === 'bicycle');

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
        cleaned[index][key] =
          parseFloat((value as string).replace(',', '.')) ||
          cleaned[index][key];
      }

      // Change values `"true"` to boolean values `true`
      if (typeof cleaned[index][key] === 'string' && key.includes('Has')) {
        cleaned[index][key] = key === 'true';
      }
    })
  );

  // console.log({
  //   in: input[0],
  //   flat: flattened[0],
  //   filt: filtered[0],
  //   clean: cleaned[0],
  // });
  console.table(filtered[0]);
  console.table(cleaned[0]);
  return cleaned;
};
