import type { SiteLocation } from "~/lib/site-location";
import React from "react";
import { EnglishLanguageButton, EnglishLanguageModal } from "./EnglishLanguage";
import { TailwindResponsiveHelper } from "./TailwindResponsiveHelper";

type Props = {
  location: SiteLocation;
  showEnglishLanguageTeaser?: boolean;
  children: React.ReactNode;
};

export const LayoutScenes: React.FC<Props> = ({
  location,
  showEnglishLanguageTeaser = true,
  children,
}) => {
  return (
    <>
      <main className="h-screen w-screen">{children}</main>
      <EnglishLanguageButton visible={showEnglishLanguageTeaser} positionBottom />
      <EnglishLanguageModal visible={showEnglishLanguageTeaser} domain={location?.host} />
      <TailwindResponsiveHelper />
    </>
  );
};
