import classNames from 'classnames';
import React from 'react';

type Props = {
  sceneId: string;
  className?: string;
};

// Files are stored at https://s3.console.aws.amazon.com/s3/buckets/fmb-aws-bucket?region=eu-central-1&prefix=KatasterKI/scenes/&showversions=false
export const SceneImage: React.VFC<Props> = ({ sceneId, className }) => {
  return (
    <img
      src={`https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${sceneId}.jpg`}
      alt="Illustration der bewerteten Szene."
      className={classNames(className)}
    />
  );
};
