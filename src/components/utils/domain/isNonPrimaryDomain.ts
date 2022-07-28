/** @desc Domain like window.location.host */
type Props = string

export const isNonPrimaryDomain = (domain: Props): undefined | boolean => {
  if (!domain) return undefined

  return domain.toLocaleLowerCase() !== 'radwege-check.de'
}
