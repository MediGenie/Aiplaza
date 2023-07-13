export interface PaginationOpts<Data> {
  total_number: number;
  page_size: number;
  rows: Data[];
}
