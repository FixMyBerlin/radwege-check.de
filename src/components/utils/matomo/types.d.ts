// Thanks to https://twitter.com/mattpocockuk/status/1547225585226760193?s=20&t=hFNL43sJeCk5oKHT3DYXnA
// ⚠️ this needs to be duplicated in our *.test.ts files.

declare global {
  interface Window {
    _paq: any[]
    dev: boolean
  }
}

export {} // needed when used stand alone
