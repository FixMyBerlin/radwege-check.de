import React from 'react';
import { Link } from '../Link';
import { PresetSlider } from './PresetSlider';
import { presetSlides } from './presetSlides.const';

export const Presets: React.FC = () => {
  return (
    <section className="bg-[#fff8e8] pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between">
          <div className="flex-grow bg-stone-300">
            <h2 className="w-full rounded-br-md bg-[#fff8e8] py-3 font-bold">
              Welche Radwege willst du vergleichen?
            </h2>
          </div>
          <nav className="flex">
            <div className="rounded-t-md bg-stone-300">
              <button type="button" disabled className="h-full w-full p-3">
                Hauptstraße
              </button>
            </div>
            <div className="bg-stone-300">
              <button
                type="button"
                className="h-full w-full rounded-bl-md bg-[#fff8e8] p-3 hover:underline"
              >
                Nebenstraße
              </button>
            </div>
          </nav>
        </div>
        <PresetSlider slides={presetSlides} />
        <p>
          <Link button to="/scenes">
            Alle 1.7000 Ergebnisse
          </Link>
        </p>
      </div>
    </section>
  );
};
