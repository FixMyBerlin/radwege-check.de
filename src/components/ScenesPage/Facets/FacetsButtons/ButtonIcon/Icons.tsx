import clsx from 'clsx'
import React from 'react'
import BollardHigh from './assets/bollard_high-icon.svg'
import BollardSmall from './assets/bollard_small-icon.svg'
import DashedLine from './assets/dashed_line-icon.svg'
import DoubleLine from './assets/double_line-icon.svg'
import GrassVerge from './assets/grass_verge-icon.svg'
import Hedge from './assets/hedge-icon.svg'
import PavedVerge from './assets/paved_verge-icon.svg'
import Planter from './assets/planter-icon.svg'
import RestrictedArea from './assets/restricted_area-icon.svg'
import SolidLine from './assets/solid_line-icon.svg'
import StreetCabinet from './assets/street_cabinet-icon.svg'

type Props = {
  forValue: string
  className?: string
}

export const Icons: React.FC<Props> = ({ forValue, className }) => {
  switch (forValue) {
    case 'none':
      return <span className={className}>Keine</span> // TODO <None />;

    case 'dashed_line':
      return (
        <DashedLine className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'solid_line':
      return (
        <SolidLine className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'double_line':
      return (
        <DoubleLine className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'restricted_area':
      return (
        <RestrictedArea
          className={clsx(className, 'scale-75')}
          title={forValue}
        />
      )

    case 'paved_verge':
      return (
        <PavedVerge className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'grass_verge':
      return (
        <GrassVerge className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'grass_verge_with_street_cabinet':
      return (
        <StreetCabinet
          className={clsx(className, 'scale-75')}
          title={forValue}
        />
      )

    case 'bollard_high':
      return (
        <BollardHigh className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'bollard_small':
      return (
        <BollardSmall
          className={clsx(className, 'scale-75')}
          title={forValue}
        />
      )

    case 'planter':
      return (
        <Planter className={clsx(className, 'scale-75')} title={forValue} />
      )

    case 'hedge':
      return <Hedge className={clsx(className, 'scale-75')} title={forValue} />

    default:
      return (
        <span className={clsx(className)} title={forValue}>
          {forValue?.[0]}
        </span>
      ) // TODO <None /title={forValue}>;
  }
}
