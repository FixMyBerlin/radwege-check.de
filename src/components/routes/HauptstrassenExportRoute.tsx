import React, { useLayoutEffect } from "react";
import { ScenesExportPage } from "~/components/ScenesExportPage";
import { getExperimentDataActions } from "~/components/ScenesPage/store";

type Props = {
  rawScenes: { node: Record<string, unknown> }[];
};

export const HauptstrassenExportRoute = ({ rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setExperimentTextKey("primary");
  }, []);

  return <ScenesExportPage experimentTextKey="primary" rawScenes={rawScenes} />;
};
