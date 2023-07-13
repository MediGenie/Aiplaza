import { FC, useMemo } from "react";
import {
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template01ContentRich } from "./Template01ContentRich";

interface Template01Content04Props {
  readonly?: boolean;
}

export const Template01Content04: FC<Template01Content04Props> = ({
  readonly,
}) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const handleSelect = () => {
    if (readonly === true) return;
    dispatch.selectSection("CONTENT_04");
  };

  const title = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_04", "TITLE") as PageSentenceColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const sub_sentence = useMemo(() => {
    return (
      (dispatch.getColumn(
        "CONTENT_04",
        "SUB_SENTENCE"
      ) as PageRichTextColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  return (
    <button
      className="relative text-start block w-full px-15"
      type="button"
      onClick={handleSelect}
      disabled={readonly}
    >
      <h2
        className="font-bold break-words"
        style={{ fontSize: 14, lineHeight: "22px", color: title.color }}
      >
        {title.content || "내용을 입력해주세요."}
      </h2>
      <Template01ContentRich
        dangerouslySetInnerHTML={{
          __html:
            sub_sentence.content || "<div><p>내용을 입력해 주세요.</p></div>",
        }}
        color={sub_sentence.color}
      ></Template01ContentRich>
    </button>
  );
};
