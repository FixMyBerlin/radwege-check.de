export type navigationMenuItemProps = { name: string; to: string };

export const navigationLinks: navigationMenuItemProps[] = [
  { name: 'Start', to: '/' },
  { name: 'Ergebnisse', to: '/scenes/' },
  { name: 'Auswertung', to: '/auswertung/' },
];
