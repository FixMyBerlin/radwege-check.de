import clsx from "clsx";
import React from "react";
import BollardHigh from "./assets/bollard_high-icon.svg";
import BollardSmall from "./assets/bollard_small-icon.svg";
import DashedLine from "./assets/dashed_line-icon.svg";
import DoubleLine from "./assets/double_line-icon.svg";
import GrassVerge from "./assets/grass_verge-icon.svg";
import Hedge from "./assets/hedge-icon.svg";
import PavedVerge from "./assets/paved_verge-icon.svg";
import Planter from "./assets/planter-icon.svg";
import RestrictedArea from "./assets/restricted_area-icon.svg";
import SolidLine from "./assets/solid_line-icon.svg";
import StreetCabinet from "./assets/street_cabinet-icon.svg";

function SvgIcon({ component: C, ...rest }: { component: unknown } & Record<string, unknown>) {
  const Cmp = C as React.ComponentType<Record<string, unknown>>;
  return <Cmp {...rest} />;
}

type Props = {
  forValue: string;
  className?: string;
};

export const Icons: React.FC<Props> = ({ forValue, className }) => {
  switch (forValue) {
    case "none":
      return <span className={className}>Keine</span>; // TODO <None />;

    case "dashed_line":
      return (
        <SvgIcon component={DashedLine} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "solid_line":
      return (
        <SvgIcon component={SolidLine} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "double_line":
      return (
        <SvgIcon component={DoubleLine} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "restricted_area":
      return (
        <SvgIcon
          component={RestrictedArea}
          className={clsx(className, "scale-75")}
          title={forValue}
        />
      );

    case "paved_verge":
      return (
        <SvgIcon component={PavedVerge} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "grass_verge":
      return (
        <SvgIcon component={GrassVerge} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "grass_verge_with_street_cabinet":
      return (
        <SvgIcon
          component={StreetCabinet}
          className={clsx(className, "scale-75")}
          title={forValue}
        />
      );

    case "bollard_high":
      return (
        <SvgIcon component={BollardHigh} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "bollard_small":
      return (
        <SvgIcon
          component={BollardSmall}
          className={clsx(className, "scale-75")}
          title={forValue}
        />
      );

    case "planter":
      return (
        <SvgIcon component={Planter} className={clsx(className, "scale-75")} title={forValue} />
      );

    case "hedge":
      return <SvgIcon component={Hedge} className={clsx(className, "scale-75")} title={forValue} />;

    default:
      return (
        <span className={clsx(className)} title={forValue}>
          {forValue?.[0]}
        </span>
      ); // TODO <None /title={forValue}>;
  }
};
