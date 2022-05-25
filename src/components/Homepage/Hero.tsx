import React from 'react';
import { Link } from '../Link';

export const Hero: React.FC = () => {
  return (
    <section className="flex w-full flex-col items-center bg-[#fff8e8] pb-12 text-gray-700">
      <img
        className="my-8 h-12"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />

      <h1 className="mb-4 text-5xl font-bold">Mach den Radwege-Check</h1>

      <h2 className="mb-6 text-2xl">
        Vergleiche Radverkehrsführungsformen nach ihrer subjektiven Sicherheit.
      </h2>

      <p className="max-w-prose">
        Der Radwege-Check lässt dich zielgenau 1.784&nbsp;Varianten von
        Radinfrastuktur vergleichen und zeigt über 400.000&nbsp;Bewertungen
        dieser Infrastrukturen von über 22.000 der{' '}
        <Link
          to="https://fixmyberlin.de/research/subjektive-sicherheit"
          external
        >
          Online-Umfrage Straßencheck
        </Link>
        .
      </p>
    </section>
  );
};
