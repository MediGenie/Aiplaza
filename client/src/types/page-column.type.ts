export enum ColumnTypeEnum {
  Image = 'image',
  Text = 'text',
  Color = 'color',
  Rich = 'rich',
  Sentence = 'sentence',
}

export type PageColumnType =
  | PageImageColumn
  | PageSentenceColumn
  | PageTextColumn
  | PageColorColumn
  | PageRichTextColumn;

export type PageImageColumn = {
  key: string;
  label: string;
  type: ColumnTypeEnum.Image;
  image?: { url: string } | (File & { url: string });
};

export type PageSentenceColumn = {
  key: string;
  label: string;
  type: ColumnTypeEnum.Sentence;
  content: string;
  color: string;
};

export type PageTextColumn = {
  key: string;
  label: string;
  type: ColumnTypeEnum.Text;
  content: string;
  color: string;
};

export type PageRichTextColumn = {
  key: string;
  label: string;
  type: ColumnTypeEnum.Rich;
  content: string;
  color: string;
};

export type PageColorColumn = {
  key: string;
  label: string;
  type: ColumnTypeEnum.Color;
  color: string;
};
