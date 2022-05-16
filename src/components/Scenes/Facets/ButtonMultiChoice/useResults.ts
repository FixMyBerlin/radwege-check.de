type Props = {
  total: number;
  bucketCount: number;
  bucketSelected: boolean;
  anySelected: boolean;
};

export const useResults = ({
  total,
  bucketCount,
  bucketSelected,
  anySelected, // For our uiSelected: aggregations with no selected buckets are shows as "all selected".
}: Props) => {
  const resultTotal = total;
  const resultDiff = bucketCount;
  const resultFuture = resultTotal - resultDiff;

  const uiSelected = bucketSelected || !anySelected;

  const allowPressWhenFutureResults = resultFuture !== 0;
  const allowPressWhenResultsWouldChange = resultDiff !== 0;

  const uiCanpress =
    allowPressWhenFutureResults && allowPressWhenResultsWouldChange;

  return { resultTotal, resultFuture, uiSelected, uiCanpress };
};
