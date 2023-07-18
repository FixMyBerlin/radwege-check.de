import { decodeDelimitedArray, encodeDelimitedArray } from 'use-query-params'

// Taken from https://github.com/pbeshai/use-query-params/tree/master/packages/serialize-query-params#api
//  Subheadline "Example with Custom Param"
// Uses a comma to delimit entries.e.g. ['a', 'b'] => qp ?=a,b * /
export const CommaArrayParam = {
  encode: (array: string[] | null | undefined): string | undefined =>
    encodeDelimitedArray(array, ','),

  decode: (
    arrayStr: string | string[] | null | undefined,
  ): string[] | undefined => decodeDelimitedArray(arrayStr, ','),
}
