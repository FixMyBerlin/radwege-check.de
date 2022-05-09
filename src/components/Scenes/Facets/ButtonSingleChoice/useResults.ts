export const useResults = ({ total, bucketCount, bucketSelected }) => {
  const resultTotal = total;
  const resultDiff = resultTotal - parseInt(bucketCount, 10) || 0;
  const resultFuture = parseInt(bucketCount, 10) || 0;

  const uiSelected = bucketSelected;
  const uiCanpress =
    !bucketSelected && (resultFuture !== 0 || resultDiff !== 0);

  return { resultTotal, resultFuture, uiSelected, uiCanpress };
};
