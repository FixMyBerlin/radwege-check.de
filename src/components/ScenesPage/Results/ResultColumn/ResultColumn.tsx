import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "~/components/Link";
import { fullUrl, trackContentImpression } from "~/components/utils";
import type { AggregationConfig } from "../../constants";
import { SceneImage } from "../../SceneImage";
import { useBookmarkActions } from "../../store";
import { ScenePrimaryProps, SceneSecondaryProps, SearchOptionProps } from "../../types";
import { titleScene } from "../../utils/titleScenes";
import { ResultCells } from "../ResultCells";
import { ResultNumbers } from "../ResultNumbers";
import { ShowTableProps } from "../Results";
import PinIconMarkup from "./assets/pin-icon.svg?raw";
import { SvgInline } from "~/components/Svg/SvgInline";
import { useIntersection } from "./utils/useIntersection";

export type PrevBucketValues = { [key: string]: string | number };

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps;
  index?: number;
  searchFilters?: SearchOptionProps["filters"];
  aggregationConfig?: AggregationConfig;
  allowBookmark: boolean;
} & ShowTableProps;

export const ResultColumn = ({
  scene,
  index = 0,
  searchFilters = {},
  showTable,
  setShowTable,
  aggregationConfig,
  allowBookmark,
}: Props) => {
  const [sceneImage, setSceneImage] = useState(scene.sceneId);
  const handleImageChange = (sceneId: string) => setSceneImage(sceneId);

  const { toggleBookmark, isInBookmarks } = useBookmarkActions();

  const safeZoneForIosSafariNavigationBar = "mb-[40rem] lg:mb-0";

  const ref = React.useRef<HTMLElement>(null);

  const isInViewport = useIntersection(ref, "-200px");
  useEffect(() => {
    if (!isInViewport) return;

    trackContentImpression({
      id: scene.sceneId,
      representation: "result column",
      url: fullUrl(scene.path),
    });
  }, [isInViewport]);

  return (
    <article
      ref={ref}
      className={clsx(
        safeZoneForIosSafariNavigationBar,
        "_snap-start box-content h-full w-56 flex-none px-1.5 pb-4 first:pl-4 lg:w-48 lg:px-2",
      )}
    >
      <h2 className="sr-only">
        <Link to={scene.path}>{titleScene(scene)}</Link>
      </h2>

      {allowBookmark && (
        <section className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => toggleBookmark(scene.sceneId)}
            className="group flex w-full cursor-pointer items-center justify-center p-2"
          >
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-yellow p-[0.4rem] group-hover:bg-yellow-400",
                isInBookmarks(scene.sceneId) ? "bg-brand-yellow" : "bg-white",
              )}
            >
              <SvgInline src={PinIconMarkup} className="h-4 w-4" aria-hidden />
            </div>
          </button>
        </section>
      )}

      <section className="mb-2">
        <Link to={scene.path} blank classNameOverwrite="relative">
          <SceneImage
            sceneId={sceneImage}
            className="h-36 w-full object-cover object-bottom"
            lazy={index > 10}
          />
        </Link>
      </section>

      <ResultNumbers
        scene={scene}
        handleHover={handleImageChange}
        showTable={showTable}
        setShowTable={setShowTable}
        wrapperClass={clsx("border-b border-dotted py-2 lg:py-3.5", showTable ? "h-96" : "h-40")}
        chartClass="border-b border-dotted"
      />

      <ResultCells
        scene={scene}
        searchFilters={searchFilters}
        aggregationConfig={aggregationConfig}
      />

      <section className="py-3 print:hidden">
        <Link button blank to={scene.path}>
          Details
        </Link>
      </section>
    </article>
  );
};
