type PresetProp = {
  title: string;
  image: React.ReactElement | null;
  results: number;
  url: string;
};

type PresetProps = {
  [key: string]: PresetProp;
};

export const presets: PresetProps = {
  'main-poller': {
    title: 'Breite Radwege mit Pollern an Hauptstraßen',
    image: null,
    results: 80,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  mischverkehr: {
    title: 'Führung Rad im Mischverkehr',
    image: null,
    results: 18,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  'seitenraum-geschaefte': {
    title: 'Radwege im Seitenraum bei Geschäftsstraßen und schmalen Gehwegen',
    image: null,
    results: 180,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
};
