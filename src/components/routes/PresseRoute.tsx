import React from "react";
import { LayoutArticle } from "~/components/Layout";
import { Link } from "~/components/Link";
import type { SiteLocation } from "~/lib/site-location";

export const PresseRoute = ({ location }: { location: SiteLocation }) => {
  return (
    <LayoutArticle location={location}>
      <h1>Presseinformationen</h1>
      <p>
        Ansprechpartner für die Presse und weitere Pressinformationen zu FixMyCity finden Sie unter{" "}
        <Link to="https://www.fixmycity.de/presse">fixmycity.de/presse</Link>.
      </p>
      <p>
        Alles Bildmaterial auf dieser Seite kann für journalistische Veröffentlichungen kostenfrei
        unter der Lizenz CC 4.0 verwendet werden.
        <br />
        Attribution: <code>© FixMyCity GmbH, Lizenz CC BY 4.0</code>
      </p>
    </LayoutArticle>
  );
};
