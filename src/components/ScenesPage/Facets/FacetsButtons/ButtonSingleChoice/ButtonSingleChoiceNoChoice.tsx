import React from "react";
import { useStore } from "zustand";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import { ResultBucketProps } from "../../../types";
import { HandleSingleChoice } from "./ButtonSingleChoice";
import { buttonClassNames } from "./utils";

type Props = {
  aggregationKey: string;
  bucketKey: string;
  buckets: ResultBucketProps[];
  handleClick: HandleSingleChoice;
};

export const ButtonSingleChoiceNoChoice = ({
  aggregationKey,
  bucketKey,
  buckets,
  handleClick,
}: Props) => {
  const { aggregationConfig } = useStore(useStoreExperimentData);

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const uiSelected = !anyOfGroupSelected;
  const uiCanpress = anyOfGroupSelected;
  const firstElement = true;
  const lastElement = false;

  const { labelClasses, inputClasses } = buttonClassNames({
    firstElement,
    lastElement,
    uiSelected,
    uiCanpress,
    showAsList: aggregationConfig[aggregationKey]?.showAsList,
  });

  const formKey = `${aggregationKey}-${bucketKey}`;
  const bucketLabel = aggregationConfig[aggregationKey].buckets[bucketKey] || "TODO";

  return (
    <label htmlFor={formKey} className={labelClasses} title="">
      <input
        id={formKey}
        name={aggregationKey}
        type="radio"
        checked={uiSelected}
        disabled={!uiCanpress}
        onChange={() =>
          handleClick({
            aggregationKey,
            selectedBucketKey: null,
          })
        }
        aria-label={bucketLabel.replace(/<[^>]*>/g, "")}
        className={inputClasses}
      />
      <span
        dangerouslySetInnerHTML={{
          __html: bucketLabel,
        }}
        aria-hidden="true"
      />
    </label>
  );
};
