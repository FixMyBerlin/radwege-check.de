import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { buttonStyles, Link } from '../Link'
import { SceneImage } from '../ScenesPage'
import { PresetsScenes } from '../ScenesPage/constants'
import { formatPercent } from '../utils'
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
        'mb-3 flex flex-col justify-center gap-3 overflow-hidden bg-stone-300 p-4'
      )}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex flex-row gap-4">
          {!slideEntries.length && (
            <li className="ml-8 inline-flex h-80 w-full place-items-center">
              Diese Inhalte sind noch in Arbeit…
            </li>
          )}

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
                    <h3 className="m-3 h-24 font-semi text-2xl leading-7 group-hover:underline">
                      {preset.title}
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
                        'absolute right-3 bottom-16 inline-flex items-center rounded-md border border-transparent bg-white/80 px-4 py-2 font-sans font-normal text-gray-800 shadow-sm'
                      )}
                    >
                      {' '}
                      {formatPercent(preset.averageScore, {
                        precision: 0,
                      })}{' '}
                      Ø Score
                    </div>
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
      <div className="flex justify-center">
        <button
          type="button"
          className={classNames(
            prevBtnEnabled
              ? 'text-stone-800 hover:text-yellow-600'
              : 'text-stone-400'
          )}
          disabled={!prevBtnEnabled}
          onClick={scrollPrev}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          type="button"
          className={classNames(
            nextBtnEnabled
              ? 'text-stone-800 hover:text-yellow-600'
              : 'text-stone-400'
          )}
          disabled={!nextBtnEnabled}
          onClick={scrollNext}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}
