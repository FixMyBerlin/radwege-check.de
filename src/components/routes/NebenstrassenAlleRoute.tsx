import React, { useLayoutEffect } from "react";
import { ScenesAllPage } from "~/components/ScenesAllPage";
import { getExperimentDataActions } from "~/components/ScenesPage/store";

type Props = {
  rawScenes: { node: Record<string, unknown> }[];
};

export const NebenstrassenAlleRoute = ({ rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setExperimentTextKey("secondary");
  }, []);

  return <ScenesAllPage rawScenes={rawScenes} sceneKind="secondary" />;
};
