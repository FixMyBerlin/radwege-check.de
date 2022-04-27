export type ResultBucketProps = {
  key: string;
  doc_count: string;
  selected: boolean;
};

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
    items: Array<{ [key: string]: number | string }>;
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
