import {
  ServiceFormColumn,
  ServiceFormSection,
} from "../components/ServiceFormEditor/types";

export interface ServiceRequestResponseType {
  thumbnail_content: ThumbnailContentType;
  response: ResponseDataType;
}

export interface ThumbnailContentType {
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

export interface ResponseDataType {
  title: string;
  paragraph_style: ParagraphStyleType[];
  paragraph: ParagraphType[];
  backgroundColor: string;
  options: { navagations: boolean };
}

interface ParagraphStyleType {
  titleFont: string;
  headerFontSize: number;
}

interface ParagraphType {
  subtitle: string;
  medeia?: string;
  media?: string;
  header?: string;
  notes: string;
}
