import React, { useLayoutEffect } from "react";
import { NuqsClientRoot } from "~/components/NuqsClientRoot";
import { LayoutScenes } from "~/components/Layout";
import { ScenesPage } from "~/components/ScenesPage";
import {
  aggregationConfigPrimary,
  itemJsConfigPrimary,
  presetsScenesPrimary,
} from "~/components/ScenesPage/constants";
import { useStoreExperimentData, useStorePreset } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const HauptstrassenIndexRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setItemJsConfig(itemJsConfigPrimary);
    useStoreExperimentData.getState().setAggregationConfig(aggregationConfigPrimary);
    useStoreExperimentData.getState().setExperimentTextKey("primary");
    useStorePreset.getState().setPresets(presetsScenesPrimary);
  }, []);

  return (
    <NuqsClientRoot>
      <LayoutScenes location={location}>
        <ScenesPage rawScenes={rawScenes} location={location} />
      </LayoutScenes>
    </NuqsClientRoot>
  );
};
