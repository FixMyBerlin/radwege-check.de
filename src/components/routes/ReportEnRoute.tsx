import React from "react";
import { ReportPage } from "~/components/ReportPage";
import en from "~/components/ReportPage/translations/en.json";

export const ReportEnRoute = () => {
  const currentLanguage = "en";

  return <ReportPage lang={currentLanguage} translationKeys={en} />;
};
