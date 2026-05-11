import React, { useLayoutEffect } from "react";
import { LayoutArticle } from "~/components/Layout";
import { ScenesAllPage } from "~/components/ScenesAllPage";
import { getExperimentDataActions } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const NebenstrassenAlleRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setExperimentTextKey("secondary");
  }, []);

  return (
    <LayoutArticle location={location} maxWidthClass="max-w-full lg:mx-5" prose={false}>
      <ScenesAllPage rawScenes={rawScenes} sceneKind="secondary" />
    </LayoutArticle>
  );
};
