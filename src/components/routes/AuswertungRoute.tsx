import React from "react";
import { ReportPage } from "~/components/ReportPage";
import de from "~/components/ReportPage/translations/de.json";
import { LayoutArticle, MetaTags } from "~/components/Layout";
import { domain } from "~/components/utils";
import type { SiteLocation } from "~/lib/site-location";

export const AuswertungRoute = ({ location }: { location: SiteLocation }) => {
  const currentLanguage = "de";

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <MetaTags
        article
        title="Studie zur subjektiven Sicherheit im Radverkehr"
        description="Ergebnisse und Datensatz einer Umfrage mit über 22.000 Teilnehmenden"
        imagePath="/social-sharing/auswertung.jpg"
        lang={currentLanguage}
      >
        <link rel="alternate" hrefLang="de" href={`${domain}/auswertung`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/report`} />
        <link rel="alternate" hrefLang="es" href={`${domain}/evaluacion`} />
      </MetaTags>
      <ReportPage lang={currentLanguage} translationKeys={de} />
    </LayoutArticle>
  );
};
