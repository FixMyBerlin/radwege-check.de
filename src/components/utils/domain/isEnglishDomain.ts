import { englishDomainHostWitoutEnding } from './domains.const'

/** @desc Domain like window.location.host */
type Props = string

export const isEnglishDomain = (domain: Props): undefined | boolean => {
  if (!domain) return undefined

  return domain.toLocaleLowerCase().includes(englishDomainHostWitoutEnding)
}
