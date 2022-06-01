// All translations
// Our own custom options like "showAsIcon"
// Everyhting from ItemsJS is in itemJsConfig.

import { AggregationConfig } from './types';

export const aggregationConfigSecondary: AggregationConfig = {
  leftOfBicycleLane: {
    title: 'Führung des Radverkehrs',
    buckets: {
      car_lanes: 'Fahr&shy;bahn',
      parking_lane: 'Rechts v. Parken',
      curb: 'Seiten&shy;raum',
      green: 'Grün&shy;anlage',
    },
    choiceMode: 'multi',
    showAsIcons: false,
    primaryGroup: true,
  },
};
