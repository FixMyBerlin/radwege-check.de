import React from "react";
import { UsageExample } from "./UsageExample";
import TableIcon from "./assets/table-icon.svg";
import DateIcon from "./assets/date-icon.svg";
import PresentationIcon from "./assets/presentation-icon.svg";
import PointOfViewIcon from "./assets/point-of-view-icon.svg";
import tableUrl from "./assets/table.webp?url";
import presentationUrl from "./assets/presentation.webp?url";
import pointOfViewUrl from "./assets/point-of-view.webp?url";
import dateUrl from "./assets/date.webp?url";

const TableSvg = TableIcon as React.ComponentType<Record<string, unknown>>;
const PresentationSvg = PresentationIcon as React.ComponentType<Record<string, unknown>>;
const PointOfViewSvg = PointOfViewIcon as React.ComponentType<Record<string, unknown>>;
const DateSvg = DateIcon as React.ComponentType<Record<string, unknown>>;

export const UsageExamples: React.FC = () => {
  return (
    <section className="mx-auto mb-10 lg:max-w-4xl">
      <h2 className="mb-10 mt-10 text-center text-3xl font-semibold lg:mt-20">
        Wie kann ich den Radwege-Check einsetzen?
      </h2>

      <div className="flex flex-col gap-6">
        <UsageExample
          image={<img src={tableUrl} alt="" />}
          title="Varianten mit Verkehrsplaner:innen besprechen"
          icon={<TableSvg className="h-24 w-auto" />}
        >
          Suchen Sie über die <strong>Filterung</strong>, die für Ihre Planungsaufgabe passenden
          Szenarien heraus. <strong>Teilen Sie die Links</strong> zu den Einzelansichten per Email,
          oder ihre gesamte Filtereinstellung. Die <strong>Druckansicht</strong> bei den
          Einzelszenarien bietet Ihnen die Möglichkeit, alle Details zu einem Szenario kompakt
          auszudrucken.
        </UsageExample>
        <UsageExample
          image={<img src={presentationUrl} alt="" />}
          title="Planungsvarianten in Bürgerbeteiligung diskutieren"
          icon={<PresentationSvg className="h-24 w-auto" />}
        >
          Für die Bürgerbeteiligung können Sie <strong>Abwägungen zwischen Varianten</strong> in der
          Planung gut darstellen. So können z.B. Fragen zu Entscheidungen zwischen Erhalt
          Parkstreifen oder Errichtung einer breiten (und subjektiv sicherern Radverkehrsanlage) gut
          verstanden und diskutiert werden.
        </UsageExample>
        <UsageExample
          image={<img src={pointOfViewUrl} alt="" />}
          title="Empfinden aus Rad-,  Fuß- und Autoperspektive vergleichen"
          icon={<PointOfViewSvg className="h-24 w-auto" />}
        >
          Bei Planungen von Radwegen im Seitenraum ist es wichtig die{" "}
          <strong>Fußperspektive einzubeziehen</strong> und sicherzustellen, das auch diese sich
          sicherfühlen. Durch vergleich der Perspektiven sehen Sie sofort, welche Variante für beide
          Gruppen von Verkehrsteilnehmenden gut sind. Die Autoperspektive zeigt, welche Führungen
          auf der Fahrbahn aus Autofahrendensicht als sicher empfunden werden.
        </UsageExample>
        <UsageExample
          image={<img src={dateUrl} alt="" />}
          title="Ausbaustandards für Radnetze festlegen."
          icon={<DateSvg className="mb-2 h-16 w-auto" />}
        >
          Bei der Planung und Umsetzung Ihres Radnetzes können Sie je nach Ausbaustandard für die
          Netzkategorie unterschiedliche Ansprüche an die <strong>subjektive Sicherheit</strong> der
          Radinfrastruktur abwägen und definieren.
        </UsageExample>
      </div>
    </section>
  );
};
