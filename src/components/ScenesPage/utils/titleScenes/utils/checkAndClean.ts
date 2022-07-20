import { isProduction } from '~/components/utils'

export const checkAndClean = (inputArray: string[]) => {
  // This informs us of failed text lookups.
  inputArray.forEach((input, index) => {
    if (input === undefined && !isProduction) {
      // eslint-disable-next-line no-console
      console.error({
        ERROR:
          'We where not able to pick a text based on the given (now unkonwn) input.',
        ARRAY_INDEX: index,
        ALL_INPUT: inputArray,
      })
    }
  })

  return inputArray.filter(Boolean).join(' ')
}
