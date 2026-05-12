import React from "react";
import { Helmet } from "react-helmet";
import type { ReportTranslations } from "~/components/ReportPage/translations";
import { canonicalOrigin, domain, isNonPrimaryDomain, isProduction } from "~/components/utils";

const seoDefaultValues = {
  defaultTitle: "Radwege-Check",
  defaultDescription:
    "In diesem Online-Tool kannst du 1.779 Varianten von Fahrrad-Führungsformen nach ihrer Bewertung zur subjektiven Sicherheit vergleichen. Basierend auf über 400.000 Bewertungen.",
};

type Props = {
  lang?: ReportTranslations;
  noindex?: boolean;
  canonicalPath?: never; // UNUSED ATM string
  title?: string;
  sharingTitle?: string;
  description?: string;
  imagePath?: string;
  imageUrl?: string | `https://${string}`;
  imageSize?: { width: number; height: number };
  article?: boolean;
  children?: React.ReactNode;
};

/**
 * Per-route SEO for React islands. Astro’s own `<head>` lives in `BaseLayout.astro`; this
 * component augments it (title, Open Graph, etc.) via react-helmet for hydration-aware pages.
 * Prefer moving static SEO into `.astro` when a route does not need client-only head updates.
 */
export const MetaTags = ({
  lang: _lang = "de",
  noindex = false,
  canonicalPath: _canonicalPath, // UNUSED ATM
  title,
  sharingTitle,
  description,
  imagePath,
  imageUrl,
  imageSize,
  article,
  children,
}: Props) => {
  const { defaultTitle, defaultDescription } = seoDefaultValues;

  const withDefaults = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image:
      imageUrl ||
      (imagePath && `${domain() || ""}${imagePath}`) ||
      `${domain() || ""}/social-sharing/default.jpg`,
  };

  const canonicalForNonPrimaryDomain =
    typeof window !== "undefined" && isNonPrimaryDomain(window.location.host);

  const noindexOnAllButProduction = !isProduction;

  return (
    <Helmet>
      <title>{withDefaults.title}</title>
      <meta property="og:title" content={sharingTitle || withDefaults.title} />
      <meta name="twitter:title" content={sharingTitle || withDefaults.title} />

      {canonicalForNonPrimaryDomain ? (
        <link
          rel="canonical"
          href={`${canonicalOrigin}${window.location.pathname}${window.location.search}`}
          data-info-trigger="non primary domain"
        />
      ) : null}

      {noindex === true ? <meta name="robots" content="noindex" data-info-trigger="props" /> : null}
      {noindexOnAllButProduction === true ? (
        <meta name="robots" content="noindex, nofollow" data-info-trigger="non production" />
      ) : null}

      <meta name="description" content={withDefaults.description} />
      <meta property="og:description" content={withDefaults.description} />
      <meta name="twitter:description" content={withDefaults.description} />

      <meta name="image" content={withDefaults.image} />
      <meta property="og:image" content={withDefaults.image} />
      <meta name="twitter:image" content={withDefaults.image} />

      <meta name="twitter:card" content="summary_large_image" />

      {Object.entries(imageSize || {}).map(([key, value]) => (
        <meta key={key} property={`og:image:${key}`} content={`${value}`} />
      ))}

      {article ? <meta property="og:type" content="article" /> : null}

      {children}
    </Helmet>
  );
};
