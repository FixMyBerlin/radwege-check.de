import { domain } from './domain'

/** @desc Returns a full URL (unless input is a full URL already) */
export const fullUrl = (path: string) => {
  if (path.startsWith('http')) return path

  return `${domain()}${path}`
}
