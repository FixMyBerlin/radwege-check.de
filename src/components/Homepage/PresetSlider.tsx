import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { buttonStyles, Link } from '../Link';
import { PresetSlides } from './presetSlides.const';

type Props = { slides: PresetSlides };

export const PresetSlider: React.FC<Props> = ({ slides }) => {
  // https://www.embla-carousel.com/api/options/
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    draggable: true,
    align: 'start',
    skipSnaps: true,
  });
  const [allowNext, setAllowNext] = useState(true);
  const [allowPrev, setAllowPrev] = useState(false);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    // We want the slider to stopp sliding when the last element is in view.
    // Which we calcualte based on the index _AND_ the fact that only 3 slides are still in view
    // (otherwise it would stopp even with the last element half in view).
    const maxSlidesInView = Math.max(...emblaApi.slidesInView());
    const numberOfSlidesInView = emblaApi.slidesInView().length;
    const maxSlides = Object.keys(slides).length - 1;
    // console.log({
    //   slidesInView: emblaApi.slidesInView(),
    //   maxSlidesInView,
    //   maxSlides,
    //   numberOfSlidesInView,
    // });
    if (maxSlidesInView === maxSlides && numberOfSlidesInView <= 4) {
      setAllowNext(false);
    } else {
      // TODO that does not work… maybe the slides updates outside of react?
      setAllowNext(true);
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, slides]);

  return (
    <div className="mb-3 overflow-hidden rounded-md bg-stone-300 p-4">
      <div ref={emblaRef}>
        <ul className="flex flex-row gap-4">
          {Object.entries(slides).map(([presetName, preset]) => {
            return (
              <li key={presetName} className="">
                <Link
                  button
                  to={preset.url}
                  classNameOverwrite="flex h-80 w-80 flex-col justify-between rounded-md bg-white p-3 shadow-lg group"
                >
                  <>
                    <h3 className="h-24 font-semibold group-hover:underline">
                      {preset.title}
                    </h3>
                    {preset.image}
                    <div className={buttonStyles}>
                      {preset.results} Ergebnisse
                    </div>
                  </>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        className={classNames({ 'bg-red-400': allowPrev })}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-8 w-8" />
      </button>
      <button
        type="button"
        className={classNames({ 'bg-red-400': allowNext })}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-8 w-8" />
      </button>
    </div>
  );
};
