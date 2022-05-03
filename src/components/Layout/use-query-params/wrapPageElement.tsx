import { navigate } from 'gatsby';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';

function generatePath(location) {
  return location.pathname + location.search;
}

const history = {
  push: (location) => {
    navigate(generatePath(location), { replace: false, state: location.state });
  },
  replace: (location) => {
    navigate(generatePath(location), { replace: true, state: location.state });
  },
};

export const wrapPageElement = ({ element, props: { location } }) => {
  // Make sure the URLs look nicer.
  // Ref to the wrapper library https://github.com/pbeshai/use-query-params/pull/88/files
  // `encode` option in query-string https://github.com/sindresorhus/query-string#encode
  // `strict` option in query-string https://github.com/sindresorhus/query-string#strict; not sure if this does something
  const stringifyOptions = { encode: false, strict: true };
  return (
    <QueryParamProvider
      history={history}
      location={location}
      stringifyOptions={stringifyOptions}
    >
      {element}
    </QueryParamProvider>
  );
};
