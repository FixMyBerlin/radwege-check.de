import { parse, stringify } from 'query-string';
import { SearchOptionProps } from '../types';

export const encodeFilter = (
  filterObject: SearchOptionProps['filters']
): string => {
  // Testing:
  // $ node
  // > const queryString = require('query-string');
  // // Part 1: Use the given function
  // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false });
  // # => ('bar=baz&foo=bar,baz');
  // // Part 1: Cleanup the string by replacing '=' and '&'
  // // We do this since we hold the whole object in one param "filter"
  // // and want a nice looking URL (no escaping) as well.
  // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false }).replace(/=/g, ':').replace(/&/g, '|');
  // # => ('bar:baz|foo:bar,baz');
  const string = stringify(filterObject, {
    arrayFormat: 'separator',
    arrayFormatSeparator: ',',
    skipNull: true,
    skipEmptyString: true,
  })
    .replace(/=/g, ':')
    .replace(/&/g, '|');
  return string;
};

export const decodeFilter = (
  filterString: string
): SearchOptionProps['filters'] => {
  if (filterString === undefined) return {};

  const preparedString = filterString.replace(/:/g, '=').replace(/\|/g, '&');
  const parsedString = parse(preparedString, {
    arrayFormat: 'separator',
    arrayFormatSeparator: ',',
  });
  // For some reason, with this stringify->parse transformation we loose the array format for singleChoise values
  // which breaks the search. So here we check if the values is a string and wrap it in an array.
  const finalString = Object.fromEntries(
    Object.keys(parsedString).map((key) => [
      key,
      typeof parsedString[key] === 'string'
        ? [parsedString[key]]
        : parsedString[key],
    ])
  );
  return finalString as SearchOptionProps['filters'];
};
