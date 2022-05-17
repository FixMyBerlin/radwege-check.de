export type footerMenuItemProps = { name: string; to: string };
type footerMenuProp = {
  [key: string]: footerMenuItemProps[];
};

export const footerLinks: footerMenuProp = {
  content: [{ name: 'Auswertung', to: '/auswertung/' }],
  formal: [
    { name: 'Kontakt & Impressum', to: '/kontakt/' },
    { name: 'Datenschuzt', to: '/datenschutz/' },
    { name: 'OpenData, OpenSource, Lizenzen', to: '/open-data/' },
  ],
};
