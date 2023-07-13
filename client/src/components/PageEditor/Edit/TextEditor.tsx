import { ChangeEventHandler, FC, useMemo } from "react";
import { PageTextColumn } from "../../../types/page-column.type";
import { ColorPicker } from "../../ColorPicker";
import { InputArea } from "../../InputArea";
import { EditorProps } from "../types";
import { usePageDispatch } from "../usePageDispatch";
import { usePageValue } from "../usePageValue";

export const TextEditor: FC<EditorProps> = ({ column, section }) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const _column = useMemo(() => {
    return dispatch.getColumn(section, column) as null | PageTextColumn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const handleChangeInputBox: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value || "";
    dispatch.updateColumn(section, column, { content: value });
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
      <div className="rounded-lg bg-gray50 p-5 space-y-2.5 mt-2.5">
        <InputArea
          placeholder="입력해 주세요."
          value={_column.content}
          onChange={handleChangeInputBox}
        />
        <ColorPicker value={_column.color} onChange={handleChangeColor} />
      </div>
    </div>
  );
};
