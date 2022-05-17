export type footerMenuItemProps = {
  name: string;
  to: string;
  external?: boolean;
};
type footerMenuProp = {
  [key: string]: footerMenuItemProps[];
};

export const footerLinks: footerMenuProp = {
  results: [
    { name: 'Hauptstraßen', to: '/hauptstrassen/' },
    { name: 'Nebenstraßen', to: '/nebenstrassen/' },
    {
      name: 'Auswertung Subjektive Sicherheit',
      to: 'https://fixmyberlin.de/research/subjektive-sicherheit',
      external: true,
    },
  ],
  formal: [
    { name: 'Kontakt & Impressum', to: '/kontakt/' },
    { name: 'Datenschutz', to: '/datenschutz/' },
    { name: 'OpenData, OpenSource, Lizenzen', to: '/open-data/' },
  ],
};
