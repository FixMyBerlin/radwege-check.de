import clsx from 'clsx'
import React from 'react'
import { SceneImage } from '~/components/ScenesPage'
import { Subtitle } from './Subtitle'

type Props = {
  subtitle?: string | React.ReactNode
  /** @desc A SceneID. If given, we add a SceneImage. Otherwise the SceneImage should be provided via `children` */
  source?: string
  chart?: React.ReactNode
  children?: React.ReactNode
}

export const Image: React.FC<Props> = ({
  source,
  subtitle,
  chart,
  children,
}) => {
  const image = source && (
    <SceneImage sceneId={source} alt="" lazy className="mb-1 mt-0" />
  )

  return (
    <figure className={clsx({ relative: chart }, 'my-2')}>
      {image}
      {children}
      {chart && <div className="absolute right-3 top-3">{chart}</div>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </figure>
  )
}
