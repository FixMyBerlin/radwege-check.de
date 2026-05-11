import React from "react";
import { Hero, Logos, Presets, UsageExamples } from "~/components/Homepage";
import { Layout, MetaTags } from "~/components/Layout";
import type { SiteLocation } from "~/lib/site-location";

export const IndexRoute: React.FC<{ location: SiteLocation }> = ({ location }) => {
  return (
    <Layout location={location}>
      <MetaTags
        title="Radwege-Check – Vergleiche die subjektive Sicherheit von 1.779 Radinfrastrukturen."
        sharingTitle="Vergleiche 1.779 Radinfrastrukturen. Mach den Radwege-Check."
      />

      <Hero />
      <Presets />
      <UsageExamples />
      <Logos />
    </Layout>
  );
};
