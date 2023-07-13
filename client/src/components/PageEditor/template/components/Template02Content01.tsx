import { FC, useMemo } from "react";
import { Template02C1ItemDecorator, Template02C1ItemDecorator2 } from "../../../../assets";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template01ContentRich } from "./Template01ContentRich";

interface Template02Content01Props {
  readonly?: boolean;
}

export const Template02Content01: FC<Template02Content01Props> = ({
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
      <div className="w-full relative">
        <img className="absolute top-[-40px] left-[264px] w-[120px] h-[120px]" src={Template02C1ItemDecorator} alt=""/>
        <img className="absolute left-[-60px] bottom-[-20px]" src={Template02C1ItemDecorator2} alt=""/>
        <div
          className="grid grid-cols-2 gap-10"
          style={{ minHeight: 108 }}
        >
          <div>
            <h2
              className="font-bold text-b4 mb-2.5"
              style={{ color: title.color }}
            >
              {title.content || "내용을 입력해 주세요."}
            </h2>
            <Template01ContentRich
              dangerouslySetInnerHTML={{
                __html:
                  sub_sentence.content ||
                  "<div><p>내용을 입력해 주세요.</p></div>",
              }}
              color={sub_sentence.color}
              style={{ maxWidth: 285, width: 285 }}
            ></Template01ContentRich>
          </div>
          <div>
            <div className="relative">
              <div className="relative" style={{ width: '100%', height: 285 }}>
                <div
                  className="bg-gray400 z-10 absolute left-0 inset-0 rounded-br-[60px] rounded-tl-[60px] overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                  style={{
                    backgroundImage: image.image?.url
                      ? `url(${image.image.url})`
                      : undefined,
                    boxShadow: '0px 5px 18px 2px rgba(72, 72, 74, 0.1)'
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
