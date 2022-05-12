import classNames from 'classnames';
import React from 'react';

type Props = {
  sceneId: string;
  className?: string;
  alt?: string;
  lazy?: boolean;
};

// Files are stored at https://s3.console.aws.amazon.com/s3/buckets/fmb-aws-bucket?region=eu-central-1&prefix=KatasterKI/scenes/&showversions=false
export const SceneImage: React.VFC<Props> = ({
  sceneId,
  className,
  alt,
  lazy,
}) => {
  const VERSION_PREFIX = '01_';

  // Set for images "below the fold" to optimize performance. More at https://web.dev/lcp-lazy-loading/
  type LazyLoadingImageProp = { loading: 'lazy' } | undefined;
  const lazyLoad: LazyLoadingImageProp = lazy ? { loading: 'lazy' } : undefined;

  return (
    <img
      src={`https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${VERSION_PREFIX}${sceneId}.jpg`}
      alt={alt || 'Illustration der bewerteten Szene.'}
      className={classNames(className)}
      {...lazyLoad}
    />
  );
};
