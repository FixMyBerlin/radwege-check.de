import React from 'react'

export const TranslationMissing = ({ value }) => {
  return (
    <span className="text-sm text-red-400" title="Translation missing">
      Translation <code>{value}</code>
    </span>
  )
}
