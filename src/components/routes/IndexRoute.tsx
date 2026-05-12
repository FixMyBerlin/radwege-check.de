import React from "react";
import { Hero, Logos, Presets, UsageExamples } from "~/components/Homepage";

export const IndexRoute = () => {
  return (
    <>
      <Hero />
      <Presets />
      <UsageExamples />
      <Logos />
    </>
  );
};
