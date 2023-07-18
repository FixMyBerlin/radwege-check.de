// Build translations URL and keep existing params
export const googleTranslateUrl = (location: Window['location']) => {
  const translateUrl = new URL(
    `https://radwege--check-de.translate.goog${location.pathname}`,
  )
  const currentParams = new URLSearchParams(location.search)
  currentParams.forEach((v, k) => translateUrl.searchParams.set(k, v))
  translateUrl.searchParams.set('_x_tr_sl', 'de') // Source
  translateUrl.searchParams.set('_x_tr_tl', 'en') // Target
  translateUrl.searchParams.set('_x_tr_hl', 'en') // UI
  translateUrl.searchParams.set('_x_tr_pto', 'wapp')

  return translateUrl.toString()
}
