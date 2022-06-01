export type SearchOptionProps = {
  per_page: string;
  sort: {
    field: string;
    order: 'desc' | 'asc';
  };
  filters: { [key: string]: string[] };
};

export type ResultBucketProps = {
  key: string;
  doc_count: number;
  selected: boolean;
};

export type SceneCategory = 'primary' | 'secondary';

export type SceneSecondaryProps = {
  sceneId: string;
  sceneIdCar: string;
  sceneIdPedestrian: never;
  sceneIdCount: number;

  vote0Unsafe: number;
  vote1RatherUnsafe: number;
  vote2Save: number;
  voteCar3VerySave: number;
  vote3VerySave: number;
  voteCount: number;
  voteMeans: number;
  voteScore: number;
  voteCar0Unsafe: number | undefined;
  voteCar1RatherUnsafe: number | undefined;
  voteCar2Save: number | undefined;
  voteCarCount: number | undefined;
  voteCarMeans: number | undefined;
  voteCarScore: number | undefined;
  votePedestrian0Unsafe: never;
  votePedestrian1RatherUnsafe: never;
  votePedestrian2Save: never;
  votePedestrian3VerySave: never;
  votePedestrianCount: never;
  votePedestrianMeans: never;
  votePedestrianScore: never;

  path: string;
};

export type ScenePrimaryProps = {
  sceneId: string;
  sceneIdCar: string;
  sceneIdPedestrian: string;
  sceneIdCount: number;

  bicycleLaneSurface: string;
  bicycleLaneUsableWidthNumber: number | undefined;
  bicycleLaneWidth: string;
  bicycleLaneWidthNumber: number | undefined;
  bufferHasPhysicalProtection: boolean;
  bufferLeftMarking: string;
  bufferLeftPhysicalProtection: string;
  bufferLeftWidth: string;
  bufferLeftWidthNumber: number | undefined;
  bufferRightMarking: string;
  bufferRightWidth: string;
  bufferRightWidthNumber: number | undefined;
  leftOfBicycleLane: string;
  location: string;
  parking: string;
  pavementHasShops: boolean;
  pavementWidth: string;
  pavementWidthNumber: number | undefined;
  vehicleLaneMaxspeed: string;
  vehicleLaneUsage: string;
  vehicleTrafficVolume: string;

  vote0Unsafe: number;
  vote1RatherUnsafe: number;
  vote2Save: number;
  voteCar3VerySave: number;
  vote3VerySave: number;
  voteCount: number;
  voteMeans: number;
  voteScore: number;
  voteCar0Unsafe: number | undefined;
  voteCar1RatherUnsafe: number | undefined;
  voteCar2Save: number | undefined;
  voteCarCount: number | undefined;
  voteCarMeans: number | undefined;
  voteCarScore: number | undefined;
  votePedestrian0Unsafe: number | undefined;
  votePedestrian1RatherUnsafe: number | undefined;
  votePedestrian2Save: number | undefined;
  votePedestrian3VerySave: number | undefined;
  votePedestrianCount: number | undefined;
  votePedestrianMeans: number | undefined;
  votePedestrianScore: number | undefined;

  path: string;
};

export type ResultItemsProps = Array<ScenePrimaryProps | SceneSecondaryProps>;

export type ResultProps = {
  data: {
    aggregations: {
      [key: string]: {
        title: string;
        size: number;
        buckets: Array<ResultBucketProps>;
      };
    };
    allFilteredItems: null;
    items: ResultItemsProps;
  };
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
  timings: {
    facets: number;
    search: number;
    sorting: number;
    total: number;
  };
};
