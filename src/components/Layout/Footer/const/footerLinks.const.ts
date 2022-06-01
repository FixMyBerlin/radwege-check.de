export type footerMenuItemProps = {
  name: string;
  to: string;
  external?: boolean;
};
type footerMenuProp = {
  [key: string]: footerMenuItemProps[];
};

export const footerLegalLinks: footerMenuItemProps[] = [
  { name: 'Kontakt & Impressum', to: '/kontakt/' },
  { name: 'Datenschutz', to: '/datenschutz/' },
];

export const footerLinks: footerMenuProp = {
  report: [
    {
      name: 'Forschungsergebnisse Subjektive Sicherheit',
      to: 'https://fixmyberlin.de/research/subjektive-sicherheit',
      external: true,
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
};
