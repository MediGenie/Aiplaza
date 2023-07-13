import { FC, useMemo } from "react";
import {
  PageImageColumn,
  PageSentenceColumn,
  PageTextColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";

interface Template01Content03Props {
  readonly?: boolean;
}

export const Template01Content03: FC<Template01Content03Props> = ({
  readonly,
}) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const handleSelect = () => {
    if (readonly === true) return;
    dispatch.selectSection("CONTENT_03");
  };

  const title = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_03", "TITLE") as PageSentenceColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const sub_sentence = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_03", "SUB_SENTENCE") as PageTextColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image = useMemo(() => {
    return (dispatch.getColumn("CONTENT_03", "IMAGE") as PageImageColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  return (
    <button
      className="relative text-start block w-full px-15"
      type="button"
      onClick={handleSelect}
      disabled={readonly}
    >
      <div
        className="border border-white p-5 rounded-lg bg-white bg-opacity-30 flex space-x-2.5"
        style={{
          boxShadow: "0px 5px 4px 1px rgba(255, 255, 255, 0.25)",
        }}
      >
        <div
          className="w-15 h-15 !bg-center !bg-no-repeat !bg-cover bg-gray400 rounded-full border border-black"
          style={{
            filter: "drop-shadow(0px 0px 4px #FFFFFF)",
            backgroundImage: image.image?.url
              ? `url(${image.image.url})`
              : undefined,
          }}
        ></div>
        <div className="max-w-[495px]">
          <h2
            className="font-bold break-words"
            style={{ fontSize: 14, lineHeight: "22px", color: title.color }}
          >
            {title.content || "내용을 입력해주세요."}
          </h2>
          <p
            className="whitespace-pre-line break-words"
            style={{
              fontSize: 14,
              lineHeight: "22px",
              color: sub_sentence.color,
            }}
          >
            {sub_sentence.content || "내용을 입력해주세요."}
          </p>
        </div>
      </div>
    </button>
  );
};
