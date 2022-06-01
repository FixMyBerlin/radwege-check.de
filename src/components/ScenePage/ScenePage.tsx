import { InformationCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';
import { MetaTags } from '../Layout';
import { Link, PrintButton, TwitterButton } from '../Link';
import { Popover } from '../Popover';
import { SceneImage } from '../Scenes';
import { ResultCells } from '../Scenes/Results/ResultCells';
import { ResultStackedBarchart } from '../Scenes/Results/ResultStackedBarchart';
import { sceneImageUrl } from '../Scenes/SceneImage';
import {
  SceneCategory,
  ScenePrimaryProps,
  SceneSecondaryProps,
} from '../Scenes/types';
import { formatNumber } from '../utils';
import { dataTable } from './dataTable';

type Props = {
  category: SceneCategory;
  scene: ScenePrimaryProps | SceneSecondaryProps;
  pagePath: string;
};

export const ScenePage: React.FC<Props> = ({ category, scene, pagePath }) => {
  const table = dataTable(scene);
  const categoryTranslation =
    category === 'primary' ? 'Hauptstrasse' : 'Nebenstrasse';

  return (
    <>
      <MetaTags
        article
        title={`Diese Fahrrad-Führungsform hat ${scene.voteScore} sichere Bewertungen (${categoryTranslation}, ID ${scene.sceneId})`}
        description="Eine von 1.700 Radverkehrsführungsformen aus dem Radwege-Check. Jetzt ausprobieren!"
        imageUrl={sceneImageUrl(scene.sceneId)}
        imageSize={{ width: 1240, height: 930 }}
      />

      <div className="items-center bg-white p-3 lg:flex lg:flex-col lg:px-0 lg:py-6">
        <h1 className="mb-6 w-full max-w-7xl text-2xl">
          Szene <code>{scene.sceneId}</code>
        </h1>

        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 print:hidden">
          <TwitterButton
            url={pagePath}
            text={`Subjektive Sicherheit ${formatNumber(scene.voteScore, {
              unit: '%',
              precision: 0,
            })}`}
            hashtags="verkehrswende"
          />
          <PrintButton />
        </div>

        <div className="flex max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-4">
          <div className="order-3 lg:order-none">
            <p className="px-6 pt-0 pb-3">
              <strong className="text-xxs font-semibold">Straßenklasse</strong>
              <br />
              {categoryTranslation}
            </p>
            <div className="rounded bg-blue-50 p-6">
              <ResultCells category={category} scene={scene} />
            </div>
          </div>

          <div className="order-1 col-span-2 lg:order-none">
            <SceneImage
              sceneId={scene.sceneId}
              className="mb-5 h-96 w-full rounded object-cover object-bottom"
            />
            <div className="grid grid-cols-2 gap-5 text-xs lg:text-base">
              {'sceneIdPedestrian' in scene && scene.sceneIdPedestrian ? (
                <figure>
                  <figcaption className="mb-0.5 font-normal">
                    Perspektive einer Fußgänger:in
                  </figcaption>
                  <SceneImage
                    sceneId={scene.sceneIdPedestrian}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                    className="w-full rounded object-cover"
                  />
                </figure>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
              {'sceneIdCar' in scene && scene.sceneIdCar ? (
                <figure>
                  <figcaption className="mb-0.5 font-normal">
                    Perspektive einer Autofahrer:in
                  </figcaption>
                  <SceneImage
                    sceneId={scene.sceneIdCar}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                    className="w-full rounded object-cover"
                  />
                </figure>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
            </div>
          </div>

          <div className="order-2 flex h-96 flex-col lg:order-none">
            <div className="mb-5 flex items-center">
              Durchschnittliche Bewertungen dieser Szene zur subjektiven
              Sicherheit.{' '}
              <Popover
                buttonText={
                  <>
                    <InformationCircleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Mehr erfahren…</span>
                  </>
                }
              >
                Die Zahlen zur Bewertung der Radverkehrsführungsformen basieren
                aus einer umfassenden Online Umfrage. Die{' '}
                <Link
                  to="https://fixmyberlin.de/research/subjektive-sicherheit"
                  external
                  blank
                  classNameOverwrite="underline decoration-neutral-300 hover:decoration-white"
                >
                  Ergebnisse können in unserem Report nachgelesen werden
                </Link>
                . Die oberste große Zahl gibt den Prozentsatz aller Bewertungen
                „sicher“ und „eher sicher“ an. Die weiteren Zahlen und die
                farbigen Balken entsprechen den vier Bewertungsmöglichkeiten
                „sicher“ „eher sicher“, eher „unsicher“ und „unsicher“. Anzahl
                der Bewertungen gibt an wie viele Bewertungen zu dieser Szene in
                der Umfrage abgegeben wurden. Der Mittelwert gibt den
                Durchschnitt aller Bewertungen an zwischen 0 (unsicher) und 3
                (sicher).
              </Popover>
            </div>
            <ResultStackedBarchart
              scene={scene}
              classNameBarchartHeight="h-full"
              iconWhenEmpty
            />
            <table className="mt-1 w-full text-xxs">
              <tbody>
                {Object.keys(table).map((key) => {
                  return (
                    <tr
                      key={key}
                      className={classNames(key === 'Mittelwert' && 'border-t')}
                    >
                      <th className="w-2/5 text-left font-semibold">{key}</th>
                      <td className="w-1/5 pr-2 text-right">
                        {table[key][0] || '-'}
                      </td>
                      <td className="w-1/5 pr-2 text-right">
                        {table[key][1] || '-'}
                      </td>
                      <td className="w-1/5 pr-2 text-right">
                        {table[key][2] || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
