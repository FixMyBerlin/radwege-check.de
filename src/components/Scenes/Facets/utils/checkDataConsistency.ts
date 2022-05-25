/* eslint-disable no-console */
import { aggregationConfig } from '../../constants';

type Props = {
  aggregationKey: string;
};

// Check the consistency of config values.
// For now, we have two configs, one that we "own" and one that holds values for ItemsJS.
// We could try moving those checks in TS, but that needs restructuring and more knowledge of TS.
export const checkDataConsistency = ({ aggregationKey }: Props) => {
  const { showAsIcons } = aggregationConfig[aggregationKey];
  const { choiceMode } = aggregationConfig[aggregationKey];

  if (
    choiceMode === 'single' &&
    Object.keys(aggregationConfig[aggregationKey].buckets).filter(
      (k) => k === 'bothButton'
    ).length === 0
  ) {
    console.log({
      ERROR: `When choiceMode is 'single' there needs to be "bothButton" as well.`,
      aggregationKey,
    });
  }

  if (showAsIcons === true && choiceMode === 'multi') {
    console.log({
      ERROR: `When aggregationConfig[ID].showAsIcons is true, aggregationConfig[ID].choiceMode needs to be 'single'.`,
      aggregationKey,
    });
  }
};
