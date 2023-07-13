import { FC, useMemo } from "react";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template03ContentRich } from "./Template03ContentRich";

interface Template03Content02Props {
  readonly?: boolean;
}

export const Template03Content02: FC<Template03Content02Props> = ({
  readonly,
}) => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const handleSelect = () => {
    if (readonly === true) return;
    dispatch.selectSection("CONTENT_02");
  };
  const title = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_02", "TITLE") as PageSentenceColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);
  const sub_sentence = useMemo(() => {
    return (
      (dispatch.getColumn(
        "CONTENT_02",
        "SUB_SENTENCE"
      ) as PageRichTextColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image = useMemo(() => {
    return (dispatch.getColumn("CONTENT_02", "IMAGE") as PageImageColumn) || {};
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
        <div className="grid grid-cols-2 gap-5 pl-[57px] pr-[63px]">
          <div className="pt-[20px] relative">
            <h2
              className="leading-11 absolute top-[100px] right-[-40px] text-right"
              style={{
                color: title.color,
                fontSize: "60px",
                fontWeight: 900,
              }}
            >
              {title.content || "Result"}
            </h2>
            <Template03ContentRich
              dangerouslySetInnerHTML={{
                __html:
                  sub_sentence.content ||
                  "<div><p>내용을 입력해 주세요.</p></div>",
              }}
              color={sub_sentence.color}
            ></Template03ContentRich>
          </div>
          <div>
            <div className="relative">
              <div
                className="relative ml-[-3px]"
                style={{ width: 295, height: 180 }}
              >
                <div
                  className="bg-gray400 z-10 absolute inset-0 rounded-xl overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                  style={{
                    backgroundImage: image.image?.url
                      ? `url(${image.image.url})`
                      : undefined,
                    boxShadow: "2px 2px 10px rgba(72, 72, 74, 0.5)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
