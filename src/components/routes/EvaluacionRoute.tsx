import React from "react";
import { ReportPage } from "~/components/ReportPage";
import es from "~/components/ReportPage/translations/es.json";
import { LayoutArticle } from "~/components/Layout";
import type { SiteLocation } from "~/lib/site-location";

export const EvaluacionRoute = ({ location }: { location: SiteLocation }) => {
  const currentLanguage = "es";

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <ReportPage lang={currentLanguage} translationKeys={es} />
    </LayoutArticle>
  );
};
