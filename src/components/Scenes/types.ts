export type SearchOptionProps =
  | {
      per_page: string;
      sort: {
        field: string;
        order: 'desc' | 'asc';
      };
      filters: Array<{ [key: string]: string }>;
    }
  | Record<string, unknown>;

export type ResultBucketProps = {
  key: string;
  doc_count: string;
  selected: boolean;
};

export type ResultItemProps = { [key: string]: number | string };

export type ResultItemsProps = Array<ResultItemProps>;

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