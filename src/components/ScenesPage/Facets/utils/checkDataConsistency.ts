/* eslint-disable no-console */
import { useStore } from 'zustand'
import { isProduction } from '~/components/utils'
import { useStoreExperimentData } from '../../store'

type Props = {
  aggregationKey: string
}

// Check the consistency of config values.
// For now, we have two configs, one that we "own" and one that holds values for ItemsJS.
// We could try moving those checks in TS, but that needs restructuring and more knowledge of TS.
export const checkDataConsistency = ({ aggregationKey }: Props) => {
  if (isProduction) return

  const { aggregationConfig } = useStore(useStoreExperimentData)
  const { showAsIcons } = aggregationConfig[aggregationKey]
  const { choiceMode } = aggregationConfig[aggregationKey]

  if (
    choiceMode === 'single' &&
    Object.keys(aggregationConfig[aggregationKey].buckets).filter(
      (k) => k === 'noChoice',
    ).length === 0
  ) {
    console.log({
      ERROR: `When choiceMode is 'single' there needs to be "noChoice" as well.`,
      aggregationKey,
    })
  }

  if (showAsIcons === true && choiceMode === 'multi') {
    console.log({
      ERROR: `When aggregationConfig[ID].showAsIcons is true, aggregationConfig[ID].choiceMode needs to be 'single'.`,
      aggregationKey,
    })
  }
}
