import React, { useLayoutEffect } from "react";
import { Layout } from "~/components/Layout";
import { ScenePage } from "~/components/ScenePage";
import { aggregationConfigPrimary, itemJsConfigPrimary } from "~/components/ScenesPage/constants";
import type { ScenePrimaryProps } from "~/components/ScenesPage/types";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  scene: ScenePrimaryProps | null;
};

export const HauptstrassenSceneRoute: React.FC<Props> = ({ location, scene }) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setItemJsConfig(itemJsConfigPrimary);
    useStoreExperimentData.getState().setAggregationConfig(aggregationConfigPrimary);
    useStoreExperimentData.getState().setExperimentTextKey("primary");
  }, []);

  if (!scene) {
    return (
      <Layout location={location}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-gray-600">Scene not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <ScenePage scene={scene} pagePath={location.pathname} />
    </Layout>
  );
};
