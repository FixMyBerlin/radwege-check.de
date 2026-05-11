import React, { useLayoutEffect } from "react";
import { LayoutArticle } from "~/components/Layout";
import { ScenesAllPage } from "~/components/ScenesAllPage";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const HauptstrassenAlleRoute = ({ location, rawScenes }: Props) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setExperimentTextKey("primary");
  }, []);

  return (
    <LayoutArticle location={location} maxWidthClass="max-w-full lg:mx-5" prose={false}>
      <ScenesAllPage rawScenes={rawScenes} sceneKind="primary" />
    </LayoutArticle>
  );
};
