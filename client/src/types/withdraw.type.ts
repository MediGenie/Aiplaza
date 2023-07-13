export interface WithDrawPaginateData<T> {
  rows: T[];
  page_size: number;
  total_number: number;
  totalRevenue: number;
  totalWithdrawal: number;
  totalBalance: number;
}

export interface WithDrawListItem {
  state: string;
  service_name?: string;
  created_at: string;
  buyer_email?: string;
  price: number;
}
