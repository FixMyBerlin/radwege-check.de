import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import { ResultBucketProps } from "../../../types";
import { HandleSingleChoice } from "../ButtonSingleChoice/ButtonSingleChoice";
import { buttonIconClassNames } from "./utils";

type Props = {
  aggregationKey: string;
  bucketKey: string;
  buckets: ResultBucketProps[];
  handleClick: HandleSingleChoice;
};

export const ButtonIconNoChoice = ({ aggregationKey, bucketKey, buckets, handleClick }: Props) => {
  const { aggregationConfig } = useStore(useStoreExperimentData);
  const { showAsIcons } = aggregationConfig[aggregationKey];

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const uiSelected = !anyOfGroupSelected;
  const uiCanpress = anyOfGroupSelected;

  const { buttonClasses, iconClasses } = buttonIconClassNames({
    uiSelected,
    uiCanpress,
  });

  const bucketLabel = aggregationConfig[aggregationKey].buckets[bucketKey] || "TODO";

  return (
    <button
      key={`${aggregationKey}__${bucketKey}`}
      type="button"
      className={buttonClasses}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: null,
        })
      }
      disabled={!uiCanpress}
      aria-label={bucketLabel.replace(/<[^>]*>/g, "")}
      title=""
    >
      <span
        dangerouslySetInnerHTML={{
          __html: bucketLabel,
        }}
        className={clsx(showAsIcons && iconClasses)}
        aria-hidden="true"
      />
    </button>
  );
};
