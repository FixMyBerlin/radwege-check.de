import React from "react";
import logoMarkup from "~/components/assets/radwegecheck-logo.svg?raw";
import { SvgInline } from "~/components/Svg/SvgInline";
import { Link } from "~/components/Link";

type Props = {
  visible: boolean;
};

export const Logo = ({ visible }: Props) => {
  if (!visible) return null;

  return (
    <Link
      to="/"
      classNameOverwrite="h-8"
      className="focus:text-yellow-900 focus:outline-none"
      title="Zur Startseite…"
    >
      <SvgInline
        src={logoMarkup}
        className="h-8 w-auto hover:text-yellow-900 "
        alt="Radwege-Check"
      />
    </Link>
  );
};
