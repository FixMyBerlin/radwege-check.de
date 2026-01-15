import { GatsbyBrowser, GatsbySSR, navigate } from 'gatsby'
import { parse, stringify } from 'query-string'
import React from 'react'
import {
  QueryParamProvider,
  QueryParamAdapterComponent,
} from 'use-query-params'

function generatePath(location: { pathname?: string; search?: string }) {
  const pathname =
    location.pathname ||
    (typeof window !== 'undefined' ? window.location.pathname : '')
  const search = location.search || ''
  return pathname + search
}

// Custom Gatsby adapter component factory for use-query-params v2
const createGatsbyAdapter = (location: {
  pathname: string
  search: string
  hash?: string
}): QueryParamAdapterComponent => {
  // Create adapter object
  const adapterObj = {
    location: {
      pathname:
        location.pathname ||
        (typeof window !== 'undefined' ? window.location.pathname : ''),
      search:
        location.search ||
        (typeof window !== 'undefined' ? window.location.search : ''),
      hash:
        location.hash ||
        (typeof window !== 'undefined' ? window.location.hash : ''),
    },
    replace: (loc: { pathname?: string; search?: string }) => {
      navigate(generatePath(loc), { replace: true })
    },
    push: (loc: { pathname?: string; search?: string }) => {
      navigate(generatePath(loc), { replace: false })
    },
  }

  // Return adapter component
  const GatsbyAdapter: QueryParamAdapterComponent = ({ children }) => {
    return <>{children(adapterObj)}</>
  }

  return GatsbyAdapter
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] &
  GatsbySSR['wrapPageElement'] = ({ element, props: { location } }) => {
  // Make sure the URLs look nicer.
  // Ref to the wrapper library https://github.com/pbeshai/use-query-params/pull/88/files
  // `encode` option in query-string https://github.com/sindresorhus/query-string#encode
  // `strict` option in query-string https://github.com/sindresorhus/query-string#strict; not sure if this does something
  const currentLocation = location || { pathname: '', search: '', hash: '' }
  const adapter = createGatsbyAdapter(currentLocation)

  return (
    <QueryParamProvider
      adapter={adapter}
      options={{
        searchStringToObject: parse,
        objectToSearchString: (params) =>
          stringify(params, { encode: false, strict: false }),
      }}
    >
      {element}
    </QueryParamProvider>
  )
}
