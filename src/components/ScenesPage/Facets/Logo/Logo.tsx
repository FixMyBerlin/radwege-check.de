import React from "react";
import LogoImage from "~/components/assets/radwegecheck-logo.svg";
import { Link } from "~/components/Link";

const LogoImg = LogoImage as React.ComponentType<Record<string, unknown>>;

type Props = {
  visible: boolean;
};

export const Logo: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Link
      to="/"
      classNameOverwrite="h-8"
      className="focus:text-yellow-900 focus:outline-none"
      title="Zur Startseite…"
    >
      <LogoImg className="h-8 w-auto hover:text-yellow-900 " alt="Radwege-Check" />
    </Link>
  );
};
