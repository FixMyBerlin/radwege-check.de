import classNames from 'classnames';
import React from 'react';
import DashedLine from './assets/dashed_line-icon.svg';
import DoubleLine from './assets/double_line-icon.svg';
import GrassVerge from './assets/grass_verge-icon.svg';
import PavedVerge from './assets/paved_verge-icon.svg';
import RestrictedArea from './assets/restricted_area-icon.svg';
import SolidLine from './assets/solid_line-icon.svg';

type Props = {
  forValue: string;
  className?: string;
};

export const Icons: React.FC<Props> = ({ forValue, className }) => {
  switch (forValue) {
    case 'none':
      return <span className={className}>NONE</span>; // TODO <None />;

    case 'dashed_line':
      return <DashedLine className={className} />;

    case 'solid_line':
      return <SolidLine className={className} />;

    case 'double_line':
      return <DoubleLine className={className} />;

    case 'restricted_area':
      return <RestrictedArea className={className} />;

    case 'paved_verge':
      return <PavedVerge className={className} />;

    case 'grass_verge':
      return <GrassVerge className={className} />;

    default:
      return (
        <span className={classNames(className, 'font-semibold uppercase')}>
          {forValue?.[0]}
        </span>
      ); // TODO <None />;
  }
};
