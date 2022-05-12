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
      return (
        <span className={classNames(className, 'children:stroke-gray-600')}>
          NONE
        </span>
      ); // TODO <None />;

    case 'dashed_line':
      return (
        <DashedLine
          className={classNames(className, 'children:stroke-gray-600')}
        />
      );

    case 'solid_line':
      return (
        <SolidLine
          className={classNames(className, 'children:stroke-gray-600')}
        />
      );

    case 'double_line':
      return (
        <DoubleLine
          className={classNames(className, 'children:stroke-gray-600')}
        />
      );

    case 'restricted_area':
      return (
        <RestrictedArea
          className={classNames(className, 'children:stroke-gray-600')}
        />
      );

    case 'paved_verge':
      return (
        <PavedVerge
          className={classNames(className, 'children:fill-gray-600')}
        />
      );

    case 'grass_verge':
      return (
        <GrassVerge
          className={classNames(className, 'children:stroke-gray-600')}
        />
      );

    default:
      return (
        <span className={classNames(className, 'font-semibold uppercase')}>
          {forValue[0]}
        </span>
      ); // TODO <None />;
  }
};
