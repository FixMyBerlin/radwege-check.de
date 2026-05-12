import React from "react";
import { ReportPage } from "~/components/ReportPage";
import en from "~/components/ReportPage/translations/en.json";
import { LayoutArticle } from "~/components/Layout";
import type { SiteLocation } from "~/lib/site-location";

export const ReportEnRoute = ({ location }: { location: SiteLocation }) => {
  const currentLanguage = "en";

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <ReportPage lang={currentLanguage} translationKeys={en} />
    </LayoutArticle>
  );
};
