import React, { useState } from 'react'
import { ResultProps, SceneCategory, SearchOptionProps } from '../types'
import { ResultColumn } from './ResultColumn'

type Props = {
  category: SceneCategory
  results: ResultProps
  searchFilters: SearchOptionProps['filters']
}

export type ShowTableProps = {
  showTable: boolean
  setShowTable: null | ((showTable: boolean) => void) // null if not used
}

export const Results: React.FC<Props> = ({
  category,
  results,
  searchFilters,
}) => {
  const resultItems = results?.data?.items || []

  const [showTable, setShowTable] = useState(false)

  return (
    <div className="_snap-x-not-y z-0 flex h-full flex-grow flex-row overflow-scroll overscroll-contain">
      {resultItems.map((scene, index) => (
        <ResultColumn
          category={category}
          key={scene.sceneId}
          scene={scene}
          index={index}
          searchFilters={searchFilters}
          showTable={showTable}
          setShowTable={setShowTable}
        />
      ))}
    </div>
  )
}
