import { ServiceListItemFull } from "./service";
import {
  ResponseDataType,
  ThumbnailContentType,
} from "./service-response.type";

export interface ServiceUsageType {
  buyer: UserAccount;
  created_at: string;
  index: number;
  payment: string;
  price: number;
  rate: number;
  response: ResponseDataType;
  //FiXME 결과 어떻게 할지 정해지면 타입 넣기
  result: null;
  review: string;
  service: ServiceListItemFull;
  status: string;
  updatedAt: string;
  resultAt: string;
  _id: string;
  thumbnail_content: ThumbnailContentType;
}

interface UserAccount {
  _id: string;
  email: string;
}
