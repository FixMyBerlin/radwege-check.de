import { sceneImageUrl } from "~/components/ScenesPage/SceneImage";
import type { ScenePrimaryProps, SceneSecondaryProps } from "~/components/ScenesPage/types";
import { titleScene } from "~/components/ScenesPage/utils/titleScenes/titleScene";
import { formatNumber } from "~/components/utils";
import type { SeoHeadInput } from "~/lib/seo-head-input";

export function seoForSceneDetailPage(
  scene: ScenePrimaryProps | SceneSecondaryProps,
  experimentTextKey: "primary" | "secondary",
): SeoHeadInput {
  const title =
    titleScene(scene, { includeId: true, experimentTextKey }) ?? `Szene ${scene.sceneId}`;

  const categorySentence =
    experimentTextKey === "primary" ? "auf einer Hauptstrasse" : "in einer Nebenstrasse";

  const vote = formatNumber(scene.voteScore, { unit: "%", precision: 0 }) ?? "";

  return {
    article: true,
    title,
    description: `Diese Führungsform ${categorySentence} wurde mit ${vote} als „(eher) sicher“ bewertet.`,
    imageUrl: sceneImageUrl(scene.sceneId),
    imageSize: { width: 1240, height: 930 },
  };
}
