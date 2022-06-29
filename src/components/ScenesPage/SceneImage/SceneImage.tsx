import classNames from 'classnames'
import React from 'react'
import { sceneImageUrl } from './sceneImageUrl'

type Props = {
  sceneId: string
  className?: string
  alt?: string | React.ReactNode // ReactNode is required for <FormattedMessage />
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

  const altText = alt as string // <FormattedMessage /> should always return a string, nothing fanc

  return (
    <img
      src={sceneImageUrl(sceneId)}
      alt={altText || 'Illustration der bewerteten Szene.'}
      className={classNames(className)}
      {...lazyLoad}
    />
  )
}
