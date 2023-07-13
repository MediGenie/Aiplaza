export interface ServicePaginateData<T> {
  rows: T[];
  total_number: number;
  page_size: number;
  totalBuyer: number;
  totalUsed: number;
}

export interface ServiceListItem {
  _id: string;
  name: string;
  created_at: string;
  buyerNum: string;
  usedNum: string;
  price: string;
}

export interface ServiceListItemFull {
  average_rate: number;
  bookmark_count: number;
  buyer_count: number;
  created_at: string;
  deleted_at?: string;
  description: string;
  email: string;
  index: number;
  name: string;
  owner: Object;
  price: number;
  review_count: number;
  thumbnail: thumbnail;
  updated_at: string;
  user_count: number;
  _id: string;
}

export interface thumbnail {
  name: string;
  key: string;
  size: number;
  type: string;
  url: string;
}