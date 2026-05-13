type Props = {
  total: number
  bucketCount: number
  bucketSelected: boolean
}

export const useResults = ({ total, bucketCount, bucketSelected }: Props) => {
  const resultTotal = total
  const resultFuture = bucketCount || 0

  const uiSelected = bucketSelected

  const uiCanpress = resultFuture !== 0

  return { resultTotal, resultFuture, uiSelected, uiCanpress }
}
