import React from "react";
import { ReportPage } from "~/components/ReportPage";
import de from "~/components/ReportPage/translations/de.json";
import { LayoutArticle } from "~/components/Layout";
import type { SiteLocation } from "~/lib/site-location";

export const AuswertungRoute = ({ location }: { location: SiteLocation }) => {
  const currentLanguage = "de";

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <ReportPage lang={currentLanguage} translationKeys={de} />
    </LayoutArticle>
  );
};
