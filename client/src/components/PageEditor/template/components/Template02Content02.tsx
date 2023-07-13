import { FC, useMemo } from "react";
import {
  Template02C2ItemDecorator,
  Template02C2ItemDecorator2,
  Template02C2ItemDecorator3,
} from "../../../../assets";
import {
  PageColorColumn,
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template01ContentRich } from "./Template01ContentRich";
import { Template02ContentRich } from "./Template02ContentRich";

interface Template02Content02Props {
  readonly?: boolean;
}

export const Template02Content02: FC<Template02Content02Props> = ({
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
      <div className="w-full relative">
        <img
          className=" absolute left-[-60px]"
          src={Template02C2ItemDecorator}
          alt=""
        />
        <img
          className=" absolute -right-10"
          src={Template02C2ItemDecorator2}
          alt=""
        />
        <img
          className=" absolute left-[185px] bottom-0"
          src={Template02C2ItemDecorator3}
          alt=""
        />
        <div className="grid grid-cols-2 gap-10" style={{ minHeight: 108 }}>
          <div>
            <div className="relative">
              <div style={{ width: 285, height: 285 }}>
                <div className="w-full h-full absolute top-[-60px]">
                  <div
                    className="bg-gray400 z-10 absolute left-0 inset-0 rounded-br-[60px] rounded-tl-[60px] overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                    style={{
                      boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.5)",
                      backgroundImage: image.image?.url
                        ? `url(${image.image.url})`
                        : undefined,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <h2
              className="font-bold text-b4 mt-10 mb-2.5"
              style={{ color: title.color }}
            >
              {title.content || "내용을 입력해 주세요."}
            </h2>
            <Template02ContentRich
              dangerouslySetInnerHTML={{
                __html:
                  sub_sentence.content ||
                  "<div><p>내용을 입력해 주세요.</p></div>",
              }}
              color={sub_sentence.color}
              style={{ maxWidth: 285, width: 285 }}
            ></Template02ContentRich>
          </div>
        </div>
      </div>
    </button>
  );
};
