import React, { useMemo } from "react";
import LogoIcon from "~/components/assets/radwegecheck-logo-bildmarke.svg";
import { Link } from "~/components/Link";
import { SpinnerOrText } from "~/components/Spinner";
import { formatPercent } from "~/components/utils";
import { ResultProps } from "../types";
import { SearchOrderDropdown, SearchOrderDropdownProps } from "./SearchOrderDropdown";

const Logo = LogoIcon as React.ComponentType<Record<string, unknown>>;

type Props = {
  results: ResultProps;
  mobileFacets?: React.ReactNode;
} & SearchOrderDropdownProps;

export const TitleBar: React.FC<Props> = ({
  results,
  searchOrder,
  setSearchOrder,
  mobileFacets,
}) => {
  const resultItems = results?.data?.items || [];
  const pagination = results?.pagination;

  const resultScoreAverage = useMemo(() => {
    if (!resultItems.length) return 0;
    const sum = resultItems.reduce((acc, scene) => acc + scene.voteScore, 0);
    return Math.round(sum / resultItems.length);
  }, [resultItems]);

  const total = pagination?.total || 0;
  const perPage = pagination?.per_page || 0;

  return (
    <section className="z-10 flex h-14 flex-none flex-row items-center justify-between gap-2 bg-brand-light-yellow px-3 py-1 text-lg shadow-[0_0px_10px_0_rgba(0,_0,_0,_0.2)] lg:px-4 lg:text-xl">
      <Link to="/" classNameOverwrite="-ml-0.5 h-8 lg:hidden" title="Zur Startseite…">
        <Logo className="h-8 w-8" alt="Radwege-Check" />
      </Link>
      {mobileFacets}
      <h1
        className="relative flex justify-center text-center font-bold leading-none lg:mr-3 lg:justify-start lg:text-left"
        title={total > perPage ? `Die ersten ${perPage} Ergebnisse werden angezeigt.` : ""}
      >
        <SpinnerOrText text={`${Number(total).toLocaleString()} Ergebnisse`} />
      </h1>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* TODO: Find a way to show the average for a given filter-set for > 100 results. */}
        {resultScoreAverage && total <= perPage ? (
          <div className="text-center text-sm leading-4 text-neutral-500 lg:ml-3">
            {" "}
            Ø Score
            <br className="lg:hidden" />{" "}
            {formatPercent(resultScoreAverage, { precision: 0 }) || "-"}
          </div>
        ) : null}

        {/* <TwitterButtonIconCurrentUrl
          className="hidden lg:flex"
          onClick={() =>
            trackEvent({
              category: 'Twitter button click',
              action: `Results page ${experimentTextKey}`,
              label: 'Desktop view',
            })
          }
        /> */}

        <SearchOrderDropdown searchOrder={searchOrder} setSearchOrder={setSearchOrder} />
      </div>
    </section>
  );
};
