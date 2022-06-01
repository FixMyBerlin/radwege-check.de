export const sceneImageUrl = (sceneId: string): string => {
  const VERSION_PREFIX = '01_';
  return `https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${VERSION_PREFIX}${sceneId}.jpg`;
};
