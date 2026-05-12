import React, { useLayoutEffect } from "react";
import { ScenePage } from "~/components/ScenePage";
import { aggregationConfigPrimary, itemJsConfigPrimary } from "~/components/ScenesPage/constants";
import type { ScenePrimaryProps } from "~/components/ScenesPage/types";
import { getExperimentDataActions } from "~/components/ScenesPage/store";

type Props = {
  pagePath: string;
  scene: ScenePrimaryProps | null;
};

export const HauptstrassenSceneRoute = ({ pagePath, scene }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setItemJsConfig(itemJsConfigPrimary);
    getExperimentDataActions().setAggregationConfig(aggregationConfigPrimary);
    getExperimentDataActions().setExperimentTextKey("primary");
  }, []);

  if (!scene) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-gray-600">Scene not found</p>
        </div>
      </div>
    );
  }

  return <ScenePage scene={scene} pagePath={pagePath} />;
};
