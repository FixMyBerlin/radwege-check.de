import clsx from "clsx";
import React from "react";
import { trackEvent } from "../utils";
import { buttonStyles } from "./Link";

type Props = { onClick?: () => void };

export const PrintButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className={clsx(buttonStyles, "hidden shadow-md lg:inline-flex")}
      onClick={() => {
        window.print();
        trackEvent({ category: "Print button click", action: "Details Page" });
        if (onClick) onClick();
      }}
    >
      Drucken
    </button>
  );
};
