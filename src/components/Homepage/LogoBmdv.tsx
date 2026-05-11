import React from "react";
import bmdvUrl from "./assets/bmdv-gefoerdert.png?url";

export const LogoBmdv: React.FC = () => {
  return (
    <img
      src={bmdvUrl}
      width={200}
      height={200}
      alt="Gefördert durch: Bundesministerium für Digitales und Verkehr aufgrund eines Beschlusses des Deutschen Bundestages"
    />
  );
};
