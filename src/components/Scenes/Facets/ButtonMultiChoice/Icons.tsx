import React from 'react';
import DashedLine from './assets/dashed_line-icon.svg';
import SolidLine from './assets/solid_line-icon.svg';
import DoubleLine from './assets/double_line-icon.svg';
import RestrictedArea from './assets/restricted_area-icon.svg';
import PavedVerge from './assets/paved_verge-icon.svg';
import GrassVerge from './assets/grass_verge-icon.svg';

type Props = {
  forValue: string;
};

export const Icons: React.FC<Props> = ({ forValue }) => {
  switch (forValue) {
    case 'none':
      return <>NONE</>; // TODO <None />;

    case 'dashed_line':
      return <DashedLine />;

    case 'solid_line':
      return <SolidLine />;

    case 'double_line':
      return <DoubleLine />;

    case 'restricted_area':
      return <RestrictedArea />;

    case 'paved_verge':
      return <PavedVerge />;

    case 'grass_verge':
      return <GrassVerge />;

    default:
      return <span className="font-semibold uppercase">{forValue[0]}</span>; // TODO <None />;
  }
};
