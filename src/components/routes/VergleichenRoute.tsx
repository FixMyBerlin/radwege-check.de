import React, { useLayoutEffect, useState } from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { DocumentMetaSync } from "~/components/seo/DocumentMetaSync";
import { NuqsClientRoot } from "~/components/NuqsClientRoot";
import { LayoutArticle } from "~/components/Layout";
import { buttonStyles, Link, PrintButton } from "~/components/Link";
import {
  aggregationConfigPrimary,
  aggregationConfigSecondary,
} from "~/components/ScenesPage/constants";
import { ResultColumn } from "~/components/ScenesPage/Results/ResultColumn";
import { cleanupCsvData } from "~/components/ScenesPage/utils";
import { fullUrl, trackContentImpression } from "~/components/utils";
import { canonicalOrigin } from "~/components/utils/domain/canonicalOrigin.const";
import { VergleichenPagePrintResult } from "~/components/VergleichenPagePrintResult";
import { consumeShowBackHandoff } from "~/lib/navigation-handoff";
import type { SiteLocation } from "~/lib/site-location";

type Props = {
  location: SiteLocation;
  rawScenesPrimary: { node: Record<string, unknown> }[];
  rawScenesSecondary: { node: Record<string, unknown> }[];
};

const VergleichenInner = ({ location, rawScenesPrimary, rawScenesSecondary }: Props) => {
  const flattenedPrimary = rawScenesPrimary.map((list) => list.node);
  const scenesPrimary = cleanupCsvData(flattenedPrimary).map((s) => ({
    ...s,
    path: `/hauptstrassen/${s.sceneId}`,
  }));
  const flattenedSecondary = rawScenesSecondary.map((list) => list.node);
  const scenesSecondary = cleanupCsvData(flattenedSecondary).map((s) => ({
    ...s,
    path: `/nebenstrassen/${s.sceneId}`,
  }));

  const [bookmarksArray] = useQueryState("sceneIds", parseAsArrayOf(parseAsString));

  const bookmarkScenesPrimary = scenesPrimary.filter((s) => bookmarksArray?.includes(s.sceneId));
  const bookmarkScenesSecondary = scenesSecondary.filter((s) =>
    bookmarksArray?.includes(s.sceneId),
  );

  const [showBackButton] = useState(() => consumeShowBackHandoff());

  useLayoutEffect(() => {
    const bothScenes = [...bookmarkScenesPrimary, ...bookmarkScenesSecondary];
    bothScenes.forEach((scene) =>
      trackContentImpression({
        id: scene.sceneId,
        representation: "result column",
        url: fullUrl(scene.path),
      }),
    );
  }, [bookmarkScenesPrimary, bookmarkScenesSecondary]);

  const ids = bookmarksArray ?? [];

  const description = [
    bookmarkScenesPrimary.length && `${bookmarkScenesPrimary.length}✕ Hauptstaße`,
    bookmarkScenesSecondary.length && `${bookmarkScenesSecondary.length}✕ Nebenstraße`,
  ]
    .filter(Boolean)
    .join(" und ");

  return (
    <LayoutArticle
      location={location}
      maxWidthClass="max-w-full lg:mx-5 flex items-center flex-col"
      prose={false}
      printHideHeader
    >
      <DocumentMetaSync
        title="Ausgewählte Radverkehrsanlagen vergleichen"
        description={description || undefined}
        imageUrl={`${canonicalOrigin}/social-sharing/results.jpg`}
      />

      <h1 className="mx-3 mb-10 text-center text-3xl font-semibold print:hidden sm:text-4xl">
        {showBackButton && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className={clsx(
              buttonStyles,
              "mr-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full !p-0 align-text-bottom",
            )}
            title="Zurück zur Suchergebnisseite"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        )}{" "}
        Ausgewählte Radverkehrsanlagen vergleichen
      </h1>

      <div className="relative flex max-w-[inherit] gap-4 overflow-auto print:block print:max-w-full print:overflow-visible">
        {bookmarkScenesPrimary.length ? (
          <div className="rounded border print:inline print:border-0">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase print:hidden">
              <Link to="/hauptstrassen" state={{ bookmarksArray: ids }}>
                Hauptstraßen
              </Link>
            </h2>
            <div className="flex pl-1 pr-3 print:hidden print:grid-cols-3">
              {bookmarkScenesPrimary.map((scene, index) => (
                <ResultColumn
                  key={scene.sceneId}
                  scene={scene}
                  index={index}
                  searchFilters={undefined}
                  showTable={false}
                  setShowTable={null}
                  aggregationConfig={aggregationConfigPrimary}
                  allowBookmark={false}
                />
              ))}
            </div>
            <div className="hidden print:block">
              {bookmarkScenesPrimary.map((scene) => (
                <VergleichenPagePrintResult
                  key={scene.sceneId}
                  scene={scene}
                  aggregationConfig={aggregationConfigPrimary}
                  experimentTextKey="primary"
                />
              ))}
            </div>
          </div>
        ) : null}
        {bookmarkScenesSecondary.length ? (
          <div className="rounded border print:inline print:border-0">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase print:hidden">
              <Link to="/nebenstrassen" state={{ bookmarksArray: ids }}>
                Nebenstraßen
              </Link>
            </h2>
            <div className="flex pl-1 pr-3 print:hidden print:grid-cols-3">
              {bookmarkScenesSecondary.map((scene, index) => (
                <ResultColumn
                  key={scene.sceneId}
                  scene={scene}
                  index={index}
                  searchFilters={undefined}
                  showTable={false}
                  setShowTable={null}
                  aggregationConfig={aggregationConfigSecondary}
                  allowBookmark={false}
                />
              ))}
            </div>
            <div className="hidden print:block">
              {bookmarkScenesSecondary.map((scene) => (
                <VergleichenPagePrintResult
                  key={scene.sceneId}
                  scene={scene}
                  aggregationConfig={aggregationConfigSecondary}
                  experimentTextKey="secondary"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 print:hidden">
        <PrintButton />
      </div>
    </LayoutArticle>
  );
};

export const VergleichenRoute = (props: Props) => (
  <NuqsClientRoot>
    <VergleichenInner {...props} />
  </NuqsClientRoot>
);
