import React, { useLayoutEffect } from "react";
import { NuqsClientRoot } from "~/components/NuqsClientRoot";
import { LayoutScenes } from "~/components/Layout";
import { ScenesPage } from "~/components/ScenesPage";
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
  presetsScenesSecondary,
} from "~/components/ScenesPage/constants";
import { useStoreExperimentData, useStorePreset } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const NebenstrassenIndexRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setItemJsConfig(itemJsConfigSecondary);
    useStoreExperimentData.getState().setAggregationConfig(aggregationConfigSecondary);
    useStoreExperimentData.getState().setExperimentTextKey("secondary");
    useStorePreset.getState().setPresets(presetsScenesSecondary);
  }, []);

  return (
    <NuqsClientRoot>
      <LayoutScenes location={location}>
        <ScenesPage rawScenes={rawScenes} location={location} />
      </LayoutScenes>
    </NuqsClientRoot>
  );
};
