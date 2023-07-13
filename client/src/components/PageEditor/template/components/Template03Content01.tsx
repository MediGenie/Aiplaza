import { FC, useMemo } from "react";
import { Template03ItemDecorator } from "../../../../assets";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template03ContentRich } from "./Template03ContentRich";

interface Template03Content01Props {
  readonly?: boolean;
}

export const Template03Content01: FC<Template03Content01Props> = ({
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
        <div className="grid grid-cols-2 gap-5 pl-[57px] pr-[63px]">
          <div>
            <div className="relative pb-12">
              <div
                className="relative ml-[-3px] mt-[60px]"
                style={{ width: 295, height: 180 }}
              >
                <div
                  className="bg-gray400 z-10 absolute inset-0 rounded-xl overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                  style={{
                    backgroundImage: image.image?.url
                      ? `url(${image.image.url})`
                      : undefined,
                    boxShadow: '2px 2px 10px rgba(72, 72, 74, 0.5)',
                  }}
                ></div>
              </div>
              <div className="absolute" style={{ left: -57, top: 50 }}>
                <img
                  src={Template03ItemDecorator}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="pt-[80px] relative">
            <h2
              className="leading-11 absolute left-[-40px] top-[160px]"
              style={{
                color: title.color,
                maxWidth: 295,
                fontSize: "60px",
                fontWeight: 900,
              }}
            >
              {title.content || "Service"}
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
        </div>
      </div>
    </button>
  );
};
