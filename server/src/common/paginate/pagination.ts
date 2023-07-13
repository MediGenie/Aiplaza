import { PaginationOpts } from './pagination.opts';

export class Pagination<Data> {
  public rows: Data[];
  public total_number: number;
  public page_size: number;

  constructor(data: PaginationOpts<Data>) {
    this.rows = data.rows;
    this.total_number = data.total_number;
    this.page_size = data.page_size;
  }
}
