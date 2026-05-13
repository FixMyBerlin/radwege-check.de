import clsx from 'clsx'
import React from 'react'

import { SvgInline } from '~/components/Svg/SvgInline'

import bollardHighMarkup from './assets/bollard_high-icon.svg?raw'
import bollardSmallMarkup from './assets/bollard_small-icon.svg?raw'
import dashedLineMarkup from './assets/dashed_line-icon.svg?raw'
import doubleLineMarkup from './assets/double_line-icon.svg?raw'
import grassVergeMarkup from './assets/grass_verge-icon.svg?raw'
import hedgeMarkup from './assets/hedge-icon.svg?raw'
import pavedVergeMarkup from './assets/paved_verge-icon.svg?raw'
import planterMarkup from './assets/planter-icon.svg?raw'
import restrictedAreaMarkup from './assets/restricted_area-icon.svg?raw'
import solidLineMarkup from './assets/solid_line-icon.svg?raw'
import streetCabinetMarkup from './assets/street_cabinet-icon.svg?raw'

type Props = {
  forValue: string
  className?: string
}

export const Icons = ({ forValue, className }: Props) => {
  switch (forValue) {
    case 'none':
      return <span className={className}>Keine</span> // TODO <None />;

    case 'dashed_line':
      return (
        <SvgInline
          src={dashedLineMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'solid_line':
      return (
        <SvgInline
          src={solidLineMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'double_line':
      return (
        <SvgInline
          src={doubleLineMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'restricted_area':
      return (
        <SvgInline
          src={restrictedAreaMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'paved_verge':
      return (
        <SvgInline
          src={pavedVergeMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'grass_verge':
      return (
        <SvgInline
          src={grassVergeMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'grass_verge_with_street_cabinet':
      return (
        <SvgInline
          src={streetCabinetMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'bollard_high':
      return (
        <SvgInline
          src={bollardHighMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'bollard_small':
      return (
        <SvgInline
          src={bollardSmallMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'planter':
      return (
        <SvgInline
          src={planterMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    case 'hedge':
      return (
        <SvgInline
          src={hedgeMarkup}
          className={clsx(className, 'scale-75')}
          title={forValue}
          aria-hidden
        />
      )

    default:
      return (
        <span className={clsx(className)} title={forValue}>
          {forValue?.[0]}
        </span>
      ) // TODO <None /title={forValue}>;
  }
}
