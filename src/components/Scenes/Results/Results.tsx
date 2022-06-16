import React, { useEffect, useRef, useState } from 'react'
import {
  ResultItemsProps,
  ResultProps,
  SceneCategory,
  SearchOptionProps,
} from '../types'
import { HandleBookmarkProp, ResultColumn } from './ResultColumn'

type Props = {
  category: SceneCategory
  results: ResultProps
  bookmarkResults: ResultItemsProps
  searchFilters: SearchOptionProps['filters']
} & HandleBookmarkProp

export type ShowTableProps = {
  showTable: boolean
  setShowTable: null | ((showTable: boolean) => void) // null if not used
}

export const Results: React.FC<Props> = ({
  category,
  results,
  bookmarkResults,
  searchFilters,
  handleBookmark,
  bookmarks,
}) => {
  const resultItems = results?.data?.items || []
  const resultsRef = useRef<HTMLDivElement>()

  const [showTable, setShowTable] = useState(false)

  // We force the scroll position to left-top whenever the results changed.
  // Otherwise users might not notice that results change "left" of what they are looking at.
  useEffect(() => {
    resultsRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [resultItems])

  return (
    <div
      ref={resultsRef}
      className="_snap-x-not-y z-0 flex h-full flex-grow flex-row overflow-scroll overscroll-contain"
    >
      {bookmarkResults && (
        <div className="flex flex-row bg-brand-light-yellow">
          {bookmarkResults.map((scene, index) => (
            <ResultColumn
              category={category}
              key={`bookmark-${scene.sceneId}`}
              scene={scene}
              index={index}
              searchFilters={searchFilters}
              showTable={showTable}
              setShowTable={setShowTable}
              handleBookmark={handleBookmark}
              bookmarks={bookmarks}
            />
          ))}
        </div>
      )}

      {resultItems.map((scene, index) => (
        <ResultColumn
          category={category}
          key={scene.sceneId}
          scene={scene}
          index={index}
          searchFilters={searchFilters}
          showTable={showTable}
          setShowTable={setShowTable}
          handleBookmark={handleBookmark}
          bookmarks={bookmarks}
        />
      ))}
    </div>
  )
}
