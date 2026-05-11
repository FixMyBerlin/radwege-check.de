import { useStore } from "zustand";
import { isProduction } from "~/components/utils";
import { experimentDataStore } from "../../store";
import { ResultBucketProps } from "../../types";

type Props = {
  aggregationKey: string;
  buckets: Array<ResultBucketProps>;
};
type ReturnProps = {
  keyFromItemjsMissingInTranslations?: string[];
  keyFromTranslationMissingInItemjs?: string[];
};

export const checkBucketValueConsistency = ({ aggregationKey, buckets }: Props): ReturnProps => {
  if (isProduction) return {};

  const { aggregationConfig } = useStore(experimentDataStore);
  const bucketKeysFromItemJs = buckets.map((b) => b.key);
  const keyFromItemjsMissingInTranslations = bucketKeysFromItemJs.filter(
    (key) => aggregationConfig[aggregationKey].buckets[key] === undefined,
  );

  if (keyFromItemjsMissingInTranslations.length) {
    console.log({
      ERROR: `Missing bucket keys (${keyFromItemjsMissingInTranslations.length}) in aggregationConfig (but present in Itemjs).`,
      aggregationKey,
      missing: keyFromItemjsMissingInTranslations.join("; "),
    });
  }

  const keyFromTranslationMissingInItemjs = Object.keys(aggregationConfig[aggregationKey].buckets)
    .filter((key) => !bucketKeysFromItemJs.includes(key))
    .filter((key) => key !== "noChoice");

  if (keyFromTranslationMissingInItemjs.length) {
    console.log({
      ERROR: `Missing bucket keys (${keyFromTranslationMissingInItemjs.length}) in ItemJs (but present in aggregationConfig).`,
      aggregationKey,
      missing: keyFromTranslationMissingInItemjs.join("; "),
    });
  }

  return {
    keyFromItemjsMissingInTranslations,
    keyFromTranslationMissingInItemjs,
  };
};
