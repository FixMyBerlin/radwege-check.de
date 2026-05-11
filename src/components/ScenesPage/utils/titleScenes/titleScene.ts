import { useStore } from "zustand";
import { titlePrimaryScene, titleSecondaryScene } from ".";
import { ExperimentTextKey, experimentDataStore } from "../../store";
import { ScenePrimaryProps, SceneSecondaryProps } from "../../types";
import { OptionalOptionProps } from "./types";

export const titleScene = (
  scene: ScenePrimaryProps | SceneSecondaryProps,
  {
    includeId,
    experimentTextKey: _experimentTextKey,
  }: OptionalOptionProps & {
    experimentTextKey?: NonNullable<ExperimentTextKey>;
  } = {
    includeId: false,
  },
) => {
  const { experimentTextKey } = useStore(experimentDataStore);
  const key = _experimentTextKey || experimentTextKey;

  // Guard against the initial load
  if (key === null) return undefined;

  return "bicycleLaneSurface" in scene
    ? titlePrimaryScene(scene, { includeId })
    : titleSecondaryScene(scene, { includeId });
};
