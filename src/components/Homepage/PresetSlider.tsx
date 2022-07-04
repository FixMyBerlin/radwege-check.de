import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { FeelSafe } from '../charts'
import { buttonStyles, Link } from '../Link'
import { SceneImage } from '../ScenesPage'
import { PresetsScenes } from '../ScenesPage/constants'
import { FilterUrlProp } from './Presets'

export type Props = {
  filterUrl: FilterUrlProp
  slides: PresetsScenes
  className?: string
}

// TODO: This need to be able to switch from scenesPrimary to scenesSeconary
export const PresetSlider: React.FC<Props> = ({
  filterUrl,
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
    // TODO: Make user we stopp scrolling earlier, once the lat element is in view. See 16a9ccb.
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi, slides])

  const slideEntries = Object.entries(slides)

  return (
    <div
      className={classNames(
        className,
        'relative mb-3 flex flex-col justify-center bg-stone-200 px-10 py-6'
      )}
    >
      <div ref={emblaRef} className="relative overflow-hidden">
        <ul className="flex flex-row gap-5">
          {slideEntries.map(([presetName, preset]) => {
            const url = `${filterUrl}${preset.searchFilterString}`

            return (
              <li key={presetName} className="">
                <Link
                  button
                  to={url}
                  classNameOverwrite="flex relative h-80 w-80 flex-col justify-between rounded-md bg-white shadow-lg group"
                >
                  <>
                    <h3 className="my-3 ml-3 flex h-24 font-semi text-2xl leading-7 group-hover:underline">
                      {preset.title}
                      <div className="relative">
                        <FeelSafe value={preset.averageScore} standalone />
                      </div>
                    </h3>

                    {preset.sceneIdForImage && (
                      <div className="overflow-hidden rounded-b">
                        <SceneImage
                          sceneId={preset.sceneIdForImage}
                          className="object-cover object-bottom"
                        />
                      </div>
                    )}
                    <div
                      className={classNames(
                        buttonStyles,
                        'absolute bottom-3 right-3'
                      )}
                    >
                      {Number(preset.resultTotal).toLocaleString()} Ergebnisse
                    </div>
                  </>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <button
        type="button"
        className={classNames(
          'top-[calc(50%_-_10px] absolute -left-5 flex items-center justify-center rounded-full p-1',
          prevBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-stone-500 hover:text-white'
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
          'top-[calc(50%_-_10px] absolute -right-5 flex items-center justify-center rounded-full p-1',
          nextBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-stone-500 hover:text-white'
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
