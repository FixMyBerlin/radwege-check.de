import clsx from "clsx";
import React from "react";
import { Link } from "~/components/Link";
import type { footerMenuItemProps } from "../const/footerLinks.const";

type Props = {
  linkList: footerMenuItemProps[];
  className?: string;
};

export const FooterLinkList = ({ linkList, className }: Props) => {
  return (
    <ul className={clsx("space-y-3", className)}>
      {linkList.map((item) => (
        <li key={item.name}>
          <Link
            to={item.to}
            linkInverted
            className="block text-base leading-5"
            external={item.external}
            lang={item.lang}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
