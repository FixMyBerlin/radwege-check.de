type Props = {
  total: number
  bucketCount: number
  bucketSelected: boolean
  anySelected: boolean
}

export const useResults = ({
  total,
  bucketCount,
  bucketSelected,
  anySelected, // For our uiSelected: aggregations with no selected buckets are shows as "all selected".
}: Props) => {
  // `resultFuture` (and `resultDiff`) is special for how multiChoice works:
  const resultDiff = bucketSelected || !anySelected ? -bucketCount : bucketCount
  const resultTotal = total
  const resultFuture = resultTotal + resultDiff

  const uiSelected = bucketSelected || !anySelected

  const allowPressWhenFutureResults = resultFuture !== 0
  const allowPressWhenResultsWouldChange = resultDiff !== 0

  const uiCanpress =
    allowPressWhenFutureResults && allowPressWhenResultsWouldChange

  return { resultFuture, uiSelected, uiCanpress }
}
