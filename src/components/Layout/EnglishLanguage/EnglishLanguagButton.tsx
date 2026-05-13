import clsx from "clsx";
import React from "react";
import { isDev } from "~/components/utils";
import { SvgInline } from "~/components/Svg/SvgInline";
import { Link } from "../../Link";
import googleTranslateLogoMarkup from "./assets/google-translate-logo.svg?raw";
import { googleTranslateUrl } from "./utils";

type Props = {
  visible: boolean;
  positionBottom?: boolean;
};

export const EnglishLanguageButton = ({ visible, positionBottom }: Props) => {
  if (!visible) return null;

  // Guard SSR
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) return null;

  // Show only if user does not speak German
  // … but show always on DEV.
  const speaksDe = navigator.languages?.some((l) => l.includes("de")) ?? false;
  if (speaksDe && !isDev) return null;

  const translateUrl = googleTranslateUrl(window.location);
  if (!translateUrl) return null;

  return (
    <Link
      to={translateUrl}
      external
      button
      lang="en"
      title="Open page current in Google Translate"
      className={clsx(
        "absolute right-5 flex flex-row items-center gap-0.5 shadow-md print:hidden",
        positionBottom ? "bottom-5" : "top-5",
      )}
    >
      <SvgInline
        src={googleTranslateLogoMarkup}
        className="mr-1 mt-0.5 h-4 w-4 object-contain"
        aria-hidden
      />{" "}
      Translate page
    </Link>
  );
};
