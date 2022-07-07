import { ReportTranslations } from '~/components/ReportPage/translations'

export type footerMenuItemProps = {
  name: string
  to: string
  external?: boolean
  lang?: ReportTranslations
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
      lang: 'de',
    },
    {
      name: '(English) Report on subjective safety',
      to: '/report',
      lang: 'en',
    },
    {
      name: '(Español) Resultados de la investigación Seguridad subjetiva',
      to: '/evaluacion',
      lang: 'es',
    },
  ],
  results: [
    { name: 'Hauptstraßen', to: '/hauptstrassen/' },
    { name: 'Nebenstraßen', to: '/nebenstrassen/' },
  ],
  formal: [
    ...footerLegalLinks,
    { name: 'Presseinformationen', to: '/presse/' },
    { name: 'OpenData & OpenSource', to: '/open-data/' },
  ],
}
