export interface PaginateData<T> {
  rows: T[];
  total_number: number;
  page_size: number;
}
