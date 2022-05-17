type PresetSlide = {
  title: string;
  image: React.ReactElement | null;
  results: number;
  url: string;
};

export type PresetSlides = {
  [key: string]: PresetSlide;
};

export const presetSlides: PresetSlides = {
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
  foo1: {
    title: 'Foo 1',
    image: null,
    results: 80,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo2: {
    title: 'Foo 2',
    image: null,
    results: 18,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo4: {
    title: 'Foo 3',
    image: null,
    results: 180,
    url: '/scenes/?filter=bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
};
