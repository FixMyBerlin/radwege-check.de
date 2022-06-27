export const checkAndClean = (inputArray: string[]) => {
  // This informs us of failed text lookups.
  const check = inputArray.filter((i) => i === undefined)
  if (check.length) {
    console.error({
      ERROR:
        'We where not able to pick a text based on the given (now unkonwn) input.',
      COUNT: check.length,
    })
  }

  return inputArray.filter(Boolean).join(' ')
}
