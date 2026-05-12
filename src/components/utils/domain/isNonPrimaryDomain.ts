import { englishDomainHost, primaryDomainHost } from "./domains.const";

/** Hostname like `window.location.host` (may include port). */
type Props = string;

export const isNonPrimaryDomain = (host: Props): undefined | boolean => {
  if (!host) return undefined;

  const h = host.split(":")[0]?.toLowerCase() ?? "";
  return h !== primaryDomainHost.toLowerCase() && h !== englishDomainHost.toLowerCase();
};
