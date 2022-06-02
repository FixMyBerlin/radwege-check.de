import classNames from 'classnames'
import React from 'react'
import BollardHigh from './assets/bollard_high-icon.svg'
import BollardSmall from './assets/bollard_small-icon.svg'
import DashedLine from './assets/dashed_line-icon.svg'
import DoubleLine from './assets/double_line-icon.svg'
import GrassVerge from './assets/grass_verge-icon.svg'
import Green from './assets/green-icon.svg'
import PavedVerge from './assets/paved_verge-icon.svg'
import Planter from './assets/planter-icon.svg'
import RestrictedArea from './assets/restricted_area-icon.svg'
import SolidLine from './assets/solid_line-icon.svg'

type Props = {
  forValue: string
  className?: string
}

export const Icons: React.FC<Props> = ({ forValue, className }) => {
  switch (forValue) {
    case 'none':
      return (
        <span className="" title={forValue}>
          Keine
        </span>
      ) // TODO <None />;

    case 'dashed_line':
      return <DashedLine className={className} title={forValue} />

    case 'solid_line':
      return <SolidLine className={className} title={forValue} />

    case 'double_line':
      return <DoubleLine className={className} title={forValue} />

    case 'restricted_area':
      return <RestrictedArea className={className} title={forValue} />

    case 'paved_verge':
      return <PavedVerge className={className} title={forValue} />

    case 'grass_verge':
      return <GrassVerge className={className} title={forValue} />

    case 'bollard_high':
      return <BollardHigh className={className} title={forValue} />

    case 'bollard_small':
      return <BollardSmall className={className} title={forValue} />

    case 'planter':
      return <Planter className={className} title={forValue} />

    case 'green':
      return <Green className={className} title={forValue} />

    default:
      return (
        <span className={classNames(className)} title={forValue}>
          {forValue?.[0]}
        </span>
      ) // TODO <None /title={forValue}>;
  }
}
