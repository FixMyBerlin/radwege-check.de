import clsx from 'clsx'
import React from 'react'
import { sceneImageUrl } from './sceneImageUrl'

type Props = {
  sceneId: string
  className?: string
  alt?: string
  lazy?: boolean
}

// Files are stored at https://s3.console.aws.amazon.com/s3/buckets/fmb-aws-bucket?region=eu-central-1&prefix=KatasterKI/scenes/&showversions=false
export const SceneImage: React.VFC<Props> = ({
  sceneId,
  className,
  alt,
  lazy,
}) => {
  // Set for images "below the fold" to optimize performance. More at https://web.dev/lcp-lazy-loading/
  type LazyLoadingImageProp = { loading: 'lazy' } | undefined
  const lazyLoad: LazyLoadingImageProp = lazy ? { loading: 'lazy' } : undefined

  return (
    <img
      src={sceneImageUrl(sceneId)}
      alt={alt || 'Illustration der bewerteten Szene.'}
      className={clsx(className)}
      {...lazyLoad}
    />
  )
}
