import classNames from 'classnames';
import React from 'react';

type Props = {
  sceneId: string;
  className?: string;
};

export const SceneImage: React.VFC<Props> = ({ sceneId, className }) => {
  return (
    <img
      src={`https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${sceneId}.jpg`}
      alt="Illustration der bewerteten Szene."
      className={classNames(className)}
    />
  );
};
