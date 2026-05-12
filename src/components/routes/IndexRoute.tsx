import React from "react";
import { Hero, Logos, Presets, UsageExamples } from "~/components/Homepage";
import { Layout } from "~/components/Layout";
import type { SiteLocation } from "~/lib/site-location";

export const IndexRoute = ({ location }: { location: SiteLocation }) => {
  return (
    <Layout location={location}>
      <Hero />
      <Presets />
      <UsageExamples />
      <Logos />
    </Layout>
  );
};
