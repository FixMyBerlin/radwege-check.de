export type Preset = {
  title: string;
  sceneIdForImage: string | null;
  results: number;
  searchFilterString: string;
};

export type Presets = { [key: string]: Preset };

// TODO Try to get this working with TS magic…
//   https://bobbyhadz.com/blog/typescript-create-type-from-object-keys
// export type Presets = typeof presets;
// export type PresetKeys = keyof typeof presets | 'custom';
// ^- this needs an 'as const' on the object below.

export const presetsScenesSecondary = {};

export const presetsScenesPrimary = {
  'main-poller': {
    title: 'Breite Radwege mit Pollern an Hauptstraßen',
    sceneIdForImage: 'MS_C_573',
    results: 80,
    searchFilterString: 'bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  mischverkehr: {
    title: 'Führung Rad im Mischverkehr',
    sceneIdForImage: 'MS_C_573',
    results: 18,
    searchFilterString: 'bicycleLaneWidth:wide',
  },
  'seitenraum-geschaefte': {
    title: 'Radwege im Seitenraum bei Geschäftsstraßen und schmalen Gehwegen',
    sceneIdForImage: 'MS_C_573',
    results: 180,
    searchFilterString: 'leftOfBicycleLane:car_lanes',
  },
  foo1: {
    title: 'Foo 1',
    sceneIdForImage: 'MS_C_573',
    results: 80,
    searchFilterString: 'bicycleLaneWidth:narrow|leftOfBicycleLane:car_lanes',
  },
  foo2: {
    title: 'Foo 2',
    sceneIdForImage: 'MS_C_573',
    results: 18,
    searchFilterString: 'bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
  foo4: {
    title: 'Foo 3',
    sceneIdForImage: 'MS_C_573',
    results: 180,
    searchFilterString: 'bicycleLaneWidth:wide|leftOfBicycleLane:car_lanes',
  },
};
