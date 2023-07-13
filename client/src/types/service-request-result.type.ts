import {
  ServiceFormColumn,
  ServiceFormSection,
} from "../components/ServiceFormEditor/types";

export interface ServiceRequestResultType {
  result: any;
  thumbnail_content: ThumbnailContentType;
  result_form: ServiceFormSection[];
}

interface ThumbnailContentType {
  description: string;
  title: string;
  thumbnail: ThumbnailType;
}

interface ThumbnailType {
  url: string;
  type: string;
  size: number;
  name: string;
  key: string;
}
