import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { SceneCategory } from '~/components/ScenesPage/types'
import { PresetsScenes } from '../../ScenesPage/constants'
import { PresetSliderSlide } from './PresetSliderSlide'

export type Props = {
  sceneCategory: SceneCategory
  slides: PresetsScenes
  className?: string
}

export const PresetSlider: React.FC<Props> = ({
  sceneCategory,
  slides,
  className,
}) => {
  // https://www.embla-carousel.com/api/options/
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    draggable: true,
    align: 'start',
    skipSnaps: true,
    inViewThreshold: 0.95,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return

    setPrevBtnEnabled(emblaApi.canScrollPrev())

    // For desktop, we need to stop earier so we don't show empty space
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 640

    if (isDesktop) {
      const slideInViewMax = Math.max(...emblaApi.slidesInView())
      // +1 to compesate for array-index-0. +1 for odd number of slides because we need to.
      const slideInViewOffset = Object.keys(slides).length % 2 ? 2 : 1
      const maxSlides = Object.keys(slides).length
      const slidesLeft = slideInViewMax + slideInViewOffset < maxSlides
      console.log({ slideInViewMax, slideInViewOffset, maxSlides, slidesLeft })

      setNextBtnEnabled(slidesLeft)
    } else {
      // Mobile and SSR-Fallback
      setNextBtnEnabled(emblaApi.canScrollNext())
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit({ startIndex: 0 })
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, slides])

  const slideEntries = Object.entries(slides)

  return (
    <div
      className={classNames(
        className,
        'relative -mx-4 mb-3 flex flex-col justify-center bg-stone-200 px-2 py-6 sm:mx-0 sm:px-3 sm:px-10'
      )}
    >
      <div ref={emblaRef} className="relative overflow-hidden">
        <ul className="flex flex-row gap-5">
          {slideEntries.map(([presetName, preset]) => {
            return (
              <li key={presetName}>
                <PresetSliderSlide
                  sceneCategory={sceneCategory}
                  preset={preset}
                />
              </li>
            )
          })}
        </ul>
      </div>
      <button
        type="button"
        className={classNames(
          'top-[calc(50%_-_10px] absolute -left-5 hidden items-center justify-center rounded-full p-1 sm:flex',
          prevBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-brand-yellow hover:text-gray-800'
            : 'bg-stone-600 text-stone-500'
        )}
        disabled={!prevBtnEnabled}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-8 w-8" />
      </button>
      <button
        type="button"
        className={classNames(
          'top-[calc(50%_-_10px] absolute -right-5 hidden items-center justify-center rounded-full p-1 sm:flex',
          nextBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-brand-yellow hover:text-gray-800'
            : 'bg-stone-600 text-stone-500'
        )}
        disabled={!nextBtnEnabled}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-8 w-8" />
      </button>
    </div>
  )
}
