import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import { SvgInline } from "~/components/Svg/SvgInline";
import { useStoreSpinner } from "../ScenesPage/store";
import spinnerIconMarkup from "./assets/spinner-icon.svg?raw";

type Props = {
  className?: string;
};

export const Spinner = ({ className }: Props) => {
  const { showSpinner } = useStore(useStoreSpinner);

  if (!showSpinner) return null;

  // Code from https://tailwindcss.com/docs/animation#basic-usage
  return (
    <SvgInline
      src={spinnerIconMarkup}
      aria-hidden
      className={clsx(className, "animate-[spin_0.7s_linear_infinite]", "h-5 w-5 text-stone-800")}
    />
  );
};
