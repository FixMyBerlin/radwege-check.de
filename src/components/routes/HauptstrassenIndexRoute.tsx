import React, { useLayoutEffect } from "react";
import { NuqsClientRoot } from "~/components/NuqsClientRoot";
import { LayoutScenes } from "~/components/Layout";
import { ScenesPage } from "~/components/ScenesPage";
import {
  aggregationConfigPrimary,
  itemJsConfigPrimary,
  presetsScenesPrimary,
} from "~/components/ScenesPage/constants";
import { experimentDataStore, presetStore } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const HauptstrassenIndexRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    experimentDataStore.getState().setItemJsConfig(itemJsConfigPrimary);
    experimentDataStore.getState().setAggregationConfig(aggregationConfigPrimary);
    experimentDataStore.getState().setExperimentTextKey("primary");
    presetStore.getState().setPresets(presetsScenesPrimary);
  }, []);

  return (
    <NuqsClientRoot>
      <LayoutScenes location={location}>
        <ScenesPage rawScenes={rawScenes} location={location} />
      </LayoutScenes>
    </NuqsClientRoot>
  );
};
