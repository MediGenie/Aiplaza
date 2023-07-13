import { FC, useMemo } from "react";
import { Template01ItemDecorator } from "../../../../assets";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template01ContentRich } from "./Template01ContentRich";

interface Template01Content01Props {
  readonly?: boolean;
}

export const Template01Content01: FC<Template01Content01Props> = ({
  readonly,
}) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const handleSelect = () => {
    if (readonly === true) return;
    dispatch.selectSection("CONTENT_01");
  };
  const title = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_01", "TITLE") as PageSentenceColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const sub_sentence = useMemo(() => {
    return (
      (dispatch.getColumn(
        "CONTENT_01",
        "SUB_SENTENCE"
      ) as PageRichTextColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const square_colors = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_01", "SQUARE_COLOR") as PageColorColumn) ||
      {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image = useMemo(() => {
    return (dispatch.getColumn("CONTENT_01", "IMAGE") as PageImageColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  return (
    <button
      className="relative text-start block w-full"
      type="button"
      onClick={handleSelect}
      disabled={readonly}
    >
      <div className="w-full">
        <h2
          className="font-bold text-b4 mb-2.5 px-15 break-words"
          style={{ color: title.color }}
        >
          {title.content || "내용을 입력해 주세요."}
        </h2>
        <div
          className="flex space-x-10 px-15 relative"
          style={{ minHeight: 108 }}
        >
          <Template01ContentRich
            dangerouslySetInnerHTML={{
              __html:
                sub_sentence.content ||
                "<div><p>내용을 입력해 주세요.</p></div>",
            }}
            color={sub_sentence.color}
            style={{ maxWidth: 285, width: 285 }}
          ></Template01ContentRich>
          <div>
            <div className="relative">
              <div style={{ width: 180, height: 180 }}>
                <div
                  className="bg-gray400 z-10 absolute inset-0 rounded-xl overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                  style={{
                    backgroundImage: image.image?.url
                      ? `url(${image.image.url})`
                      : undefined,
                  }}
                ></div>
              </div>
              <div
                className="absolute top-5 left-5 rounded-xl"
                style={{
                  zIndex: 5,
                  width: 180,
                  height: 180,
                  background: `linear-gradient(180deg, ${square_colors.color} 0%, ${square_colors.color}80 100%)`,
                }}
              ></div>
            </div>
            <div
              className="absolute left-0 bg-white bg-opacity-40"
              style={{
                right: "8%",
                height: 1,
                boxShadow: "0px 0px 4px #FFFFFF",
                top: 140,
              }}
            >
              <div
                className="absolute -top-2 -right-2"
                style={{ width: 16, height: 16 }}
              >
                <img src={Template01ItemDecorator} alt="*" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
