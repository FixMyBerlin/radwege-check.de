/* eslint-disable no-console */
import { aggregationConfig, itemJsConfig } from '../../constants';

type Props = {
  aggregationKey: string;
};

// Check the consistency of config values.
// For now, we have two configs, one that we "own" and one that holds values for ItemsJS.
// We could try moving those checks in TS, but that needs restructuring and more knowledge of TS.
export const checkDataConsistency = ({ aggregationKey }: Props) => {
  const { showAsIcons } = aggregationConfig[aggregationKey];
  const { doesNotMatterOption } = aggregationConfig[aggregationKey];

  if (
    doesNotMatterOption !==
    itemJsConfig.aggregations[aggregationKey].conjunction
  ) {
    console.log({
      ERROR: `aggregationConfig[ID].doesNotMatterOption and itemJsConfig.aggregations[ID].conjunction need to be the same.`,
      aggregationKey,
    });
  }

  if (
    doesNotMatterOption === true &&
    Object.keys(aggregationConfig[aggregationKey].buckets).filter(
      (k) => k === 'doesNotMatterOption'
    ).length === 0
  ) {
    console.log({
      ERROR: `When doesNotMatterOption is true there needs to be  "doesNotMatterOption" as well.`,
      aggregationKey,
    });
  }

  if (showAsIcons === true && doesNotMatterOption === true) {
    console.log({
      ERROR: `When aggregationConfig[ID].showAsIcons is true, aggregationConfig[ID].doesNotMatterOption needs to be false.`,
      aggregationKey,
    });
  }
};
