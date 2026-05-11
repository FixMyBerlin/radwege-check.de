import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import { useStoreSpinner } from "../ScenesPage/store";
import SpinnerIcon from "./assets/spinner-icon.svg";

const SpinnerSvg = SpinnerIcon as React.ComponentType<Record<string, unknown>>;

type Props = {
  className?: string;
};

export const Spinner = ({ className }: Props) => {
  const { showSpinner } = useStore(useStoreSpinner);

  if (!showSpinner) return null;

  // Code from https://tailwindcss.com/docs/animation#basic-usage
  return (
    <SpinnerSvg
      aria-hidden
      className={clsx(className, "animate-[spin_0.7s_linear_infinite]", "h-5 w-5 text-stone-800")}
    />
  );
};
