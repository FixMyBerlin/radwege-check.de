export type footerMenuItemProps = {
  name: string
  to: string
  external?: boolean
}
type footerMenuProp = {
  [key: string]: footerMenuItemProps[]
}

export const footerLegalLinks: footerMenuItemProps[] = [
  { name: 'Kontakt & Impressum', to: '/kontakt/' },
  { name: 'Datenschutz', to: '/datenschutz/' },
]

export const footerLinks: footerMenuProp = {
  report: [
    {
      name: '(Deutsch) Forschungsergebnisse Subjektive Sicherheit',
      to: '/auswertung',
    },
    {
      name: '(English) Report on subjective safety',
      to: '/report',
    },
    {
      name: '(Español) Resultados de la investigación Seguridad subjetiva',
      to: '/evaluacion',
    },
  ],
  results: [
    { name: 'Hauptstraßen', to: '/hauptstrassen/' },
    { name: 'Nebenstraßen', to: '/nebenstrassen/' },
  ],
  formal: [
    ...footerLegalLinks,
    { name: 'OpenData, OpenSource, Lizenzen', to: '/open-data/' },
  ],
}
