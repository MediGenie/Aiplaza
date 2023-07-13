import { FC, useMemo } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import Editor from "ckeditor5-custom-build";
import { EditorProps } from "../types";
import { PageRichTextColumn } from "../../../types/page-column.type";
import { usePageDispatch } from "../usePageDispatch";
import { usePageValue } from "../usePageValue";
import { ColorPicker } from "../../ColorPicker";
import styled from "styled-components";

const ContentDiv = styled.div`
  .ck-content {
    font-size: 14px;
    line-height: 22px;
    ul > li {
      list-style-type: none;
      ::before {
        content: "•";
        margin: 0 5px;
      }
    }
    ol > li {
      list-style-type: decimal;
      margin-left: 20px;
    }
  }
`;

export const RichEditor: FC<EditorProps> = ({ column, section }) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const _column = useMemo(() => {
    return dispatch.getColumn(section, column) as null | PageRichTextColumn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const handleChangeContent = (next: string) => {
    dispatch.updateColumn(section, column, { content: next });
  };
  const handleChangeColor = (next: string) => {
    dispatch.updateColumn(section, column, { color: next });
  };
  if (_column === null) {
    return (
      <div>
        <p className="text-b3 font-medium">잘못된 정보가 입력되었습니다.</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-semibold text-b2">{_column.label}</h2>
      <div className="rounded-lg bg-gray50 p-5 space-y-2.5 mt-2.5 max-w-[309px]">
        <ContentDiv>
          <CKEditor
            editor={Editor}
            onChange={(e: any, editor: any) => {
              const data = editor.getData();
              handleChangeContent(data);
            }}
            data={_column.content}
            clasName="break-words"
          />
        </ContentDiv>
        <ColorPicker value={_column.color} onChange={handleChangeColor} />
      </div>
    </div>
  );
};
