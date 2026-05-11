import React, { useLayoutEffect } from "react";
import { LayoutArticle } from "~/components/Layout";
import { ScenesExportPage } from "~/components/ScenesExportPage";
import { useStoreExperimentData } from "~/components/ScenesPage/store";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenes: { node: Record<string, unknown> }[];
};

export const HauptstrassenExportRoute: React.FC<Props> = ({ location, rawScenes }) => {
  useLayoutEffect(() => {
    useStoreExperimentData.getState().setExperimentTextKey("primary");
  }, []);

  return (
    <LayoutArticle location={location} maxWidthClass="max-w-full lg:mx-5" prose={false}>
      <ScenesExportPage experimentTextKey="primary" rawScenes={rawScenes} />
    </LayoutArticle>
  );
};
