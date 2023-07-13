export type BoardType = {
  _id: string;
  title: string;
  content: string;
  image?: imageType;
  index: number;
  created_at: Date | string;
  updated_at: Date | string;
  __v?: number;
};

export type imageType = {
    key: string;
    name: string;
    size: number;
    type: string;
    url: string;
}