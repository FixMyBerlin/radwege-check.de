import React, { useLayoutEffect } from "react";
import { NuqsClientRoot } from "~/components/NuqsClientRoot";
import { LayoutScenes } from "~/components/Layout";
import { ScenesPage } from "~/components/ScenesPage";
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
  presetsScenesSecondary,
} from "~/components/ScenesPage/constants";
import { getExperimentDataActions, getPresetActions } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const NebenstrassenIndexRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setItemJsConfig(itemJsConfigSecondary);
    getExperimentDataActions().setAggregationConfig(aggregationConfigSecondary);
    getExperimentDataActions().setExperimentTextKey("secondary");
    getPresetActions().setPresets(presetsScenesSecondary);
  }, []);

  return (
    <NuqsClientRoot>
      <LayoutScenes location={location}>
        <ScenesPage rawScenes={rawScenes} location={location} />
      </LayoutScenes>
    </NuqsClientRoot>
  );
};
