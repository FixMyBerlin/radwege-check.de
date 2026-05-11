import React, { useLayoutEffect } from "react";
import { Layout } from "~/components/Layout";
import { ScenePage } from "~/components/ScenePage";
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
} from "~/components/ScenesPage/constants";
import type { SceneSecondaryProps } from "~/components/ScenesPage/types";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  scene: SceneSecondaryProps | null;
};

export const NebenstrassenSceneRoute: React.FC<Props> = ({ location, scene }) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setItemJsConfig(itemJsConfigSecondary);
    useStoreExperimentData.getState().setAggregationConfig(aggregationConfigSecondary);
    useStoreExperimentData.getState().setExperimentTextKey("secondary");
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
