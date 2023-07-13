import { ColumnTypeEnum } from "../types/page-column.type";
import { PageSectionType } from "../types/page-section.type";

export const template03DefaultValue: PageSectionType[] = [
  {
    key: "HEADER",
    label: "해더3",
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: "TITLE",
        label: "타이틀",
        color: "#FFFFFF",
        content: "",
      },
      {
        type: ColumnTypeEnum.Text,
        key: "SUB_SENTENCE",
        label: "서브문구",
        color: "#FFFFFF",
        content: "",
      },
    ],
  },
  {
    key: "CONTENT_01",
    label: "본문 1",
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: "IMAGE",
        label: "이미지",
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: "TITLE",
        label: "제목",
        content: "",
        color: "#F2F2F7",
      },
      {
        type: ColumnTypeEnum.Rich,
        key: "SUB_SENTENCE",
        label: "서브문구",
        content: "",
        color: "#1C1C1E",
      },
    ],
  },
  {
    key: "CONTENT_02",
    label: "본문 2",
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: "IMAGE",
        label: "이미지",
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: "TITLE",
        label: "제목",
        content: "",
        color: "#F2F2F7",
      },
      {
        type: ColumnTypeEnum.Rich,
        key: "SUB_SENTENCE",
        label: "서브문구",
        content: "",
        color: "#1C1C1E",
      },
    ],
  },
  {
    key: "CONTENT_03",
    label: "본문 3",
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: "IMAGE",
        label: "이미지",
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: "TITLE",
        label: "제목",
        content: "",
        color: "#FFFFFF",
      },
      {
        type: ColumnTypeEnum.Rich,
        key: "SUB_SENTENCE",
        label: "서브문구",
        content: "",
        color: "#FFFFFF",
      },
    ],
  },
  {
    key: "CONTENT_04",
    label: "본문 4",
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: "TITLE",
        label: "제목",
        content: "",
        color: "#1C1C1E",
      },
      {
        type: ColumnTypeEnum.Rich,
        key: "SUB_SENTENCE",
        label: "서브문구",
        content: "",
        color: "#AEAEB2",
      },
    ],
  },
];
