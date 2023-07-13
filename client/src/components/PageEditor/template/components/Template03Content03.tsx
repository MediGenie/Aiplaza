import { FC, useMemo } from "react";
import { Template03ItemDecorator2, Template03ItemDecorator3 } from "../../../../assets";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template03ContentRich2 } from "./Template03ContentRich2";

interface Template03Content03Props {
  readonly?: boolean;
}

export const Template03Content03: FC<Template03Content03Props> = ({
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
      (dispatch.getColumn(
        "CONTENT_03",
        "SUB_SENTENCE"
      ) as PageRichTextColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image = useMemo(() => {
    return (dispatch.getColumn("CONTENT_03", "IMAGE") as PageImageColumn) || {};
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
        <div className="grid grid-cols-2 gap-5">
          <div
            className="relative ml-[-3px] mt-[60px]"
            style={{ width: 250, height: 250, position: "relative", left: 60 }}
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

          <div className="py-15 relative left-[-28px]">
            <h2
              className="font-bold mb-[10px]"
              style={{
                color: title.color,
                maxWidth: 340,
                fontSize: "20px",
                lineHeight: "30px",
                fontWeight: 900,
              }}
            >
              {title.content || "제목을 입력해 주세요."}
            </h2>
            <Template03ContentRich2
              dangerouslySetInnerHTML={{
                __html:
                  sub_sentence.content ||
                  "<div><p>내용을 입력해 주세요.</p></div>",
              }}
              color={sub_sentence.color}
            ></Template03ContentRich2>
          </div>
        </div>
        <div className="absolute top-0 left-[13px]">
          <img
            src={Template03ItemDecorator2}
            alt=""
            className=""
          />
        </div>
        
      </div>
    </button>
  );
};
