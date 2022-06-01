type Props = {
  total: number;
  bucketCount: number;
  bucketSelected: boolean;
};

export const useResults = ({ total, bucketCount, bucketSelected }: Props) => {
  const resultTotal = total;
  const resultFuture = bucketCount || 0;
  const resultDiff = resultTotal - resultFuture;

  const showSelectedWhenSelected = bucketSelected;
  const showSelectedWhenFutureResultsEqCurrentResults =
    resultTotal === resultFuture;

  const uiSelected =
    showSelectedWhenSelected || showSelectedWhenFutureResultsEqCurrentResults;

  const allowPressWhenFutureResults = resultFuture !== 0;
  const allowPreesWhenResultsWouldChange = resultDiff !== 0;

  const uiCanpress =
    allowPressWhenFutureResults && allowPreesWhenResultsWouldChange;

  return { resultTotal, resultFuture, uiSelected, uiCanpress };
};
