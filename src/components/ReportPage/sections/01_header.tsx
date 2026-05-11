import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { SvgInline } from "~/components/Svg/SvgInline";
import { Headline } from "../components";
import authorIconMarkup from "./assets/author-icon.svg?raw";

export function SectionHeader() {
  return (
    <section>
      <p className="font-light uppercase leading-5 tracking-widest">
        <FormattedMessage id="article.kicker" />
      </p>

      <Headline as="h1" className="mb-5">
        <FormattedMessage id="article.title" />
      </Headline>

      <p>
        <div className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow">
          <SvgInline src={authorIconMarkup} className="h-5 w-5 text-stone-800" aria-hidden />{" "}
        </div>
        <FormattedDate value={new Date("2020-06-06")} />{" "}
        <FormattedMessage id="article.attribution" /> |{" "}
        <strong>
          {" "}
          <FormattedMessage id="article.authors" />
        </strong>
      </p>

      <p className="text-lg">
        <strong>
          <FormattedMessage id="article.introduction" />
        </strong>
      </p>
    </section>
  );
}
