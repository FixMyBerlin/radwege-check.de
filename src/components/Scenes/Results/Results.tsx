import React from 'react'
import { ResultProps, SceneCategory, SearchOptionProps } from '../types'
import { ResultColumn } from './ResultColumn'

type Props = {
  category: SceneCategory
  results: ResultProps
  searchFilters: SearchOptionProps['filters']
}

export const Results: React.FC<Props> = ({
  category,
  results,
  searchFilters,
}) => {
  const resultItems = results?.data?.items || []

  return (
    <div className="snap-x-not-y z-0 flex h-full flex-grow flex-row overflow-scroll overscroll-contain">
      {resultItems.map((scene, index) => (
        <ResultColumn
          category={category}
          key={scene.sceneId}
          scene={scene}
          index={index}
          searchFilters={searchFilters}
        />
      ))}
    </div>
  )
}
