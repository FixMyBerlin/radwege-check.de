import type * as React from "react";

declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
  const ReactComponent: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  export default ReactComponent;
}
