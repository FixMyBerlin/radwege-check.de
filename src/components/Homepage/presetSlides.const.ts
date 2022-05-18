type PresetSlide = {
  title: string;
  sceneIdForImage: string | null;
  results: number;
  url: string;
};

export type PresetSlides = {
  [key: string]: PresetSlide;
};

export const presetSlides: PresetSlides = {
  'main-poller': {
    title: 'Breite Radwege mit Pollern an Hauptstraßen',
    sceneIdForImage: 'MS_C_573',
    results: 80,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  mischverkehr: {
    title: 'Führung Rad im Mischverkehr',
    sceneIdForImage: null,
    results: 18,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  'seitenraum-geschaefte': {
    title: 'Radwege im Seitenraum bei Geschäftsstraßen und schmalen Gehwegen',
    sceneIdForImage: null,
    results: 180,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo1: {
    title: 'Foo 1',
    sceneIdForImage: null,
    results: 80,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo2: {
    title: 'Foo 2',
    sceneIdForImage: null,
    results: 18,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo4: {
    title: 'Foo 3',
    sceneIdForImage: null,
    results: 180,
    url: '/hauptstrassen/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
};
