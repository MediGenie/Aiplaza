import { FC, useMemo } from "react";
import {
  PageImageColumn,
  PageRichTextColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template02ContentRich } from "./Template02ContentRich";

interface Template02Content03Props {
  readonly?: boolean;
}

export const Template02Content03: FC<Template02Content03Props> = ({
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

  const image1 = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_03", "IMAGE1") as PageImageColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image2 = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_03", "IMAGE2") as PageImageColumn) || {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const image3 = useMemo(() => {
    return (
      (dispatch.getColumn("CONTENT_03", "IMAGE3") as PageImageColumn) || {}
    );
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
        <div className="text-center">
          <h2
            className="font-bold text-b4 mb-2.5"
            style={{ color: title.color }}
          >
            {title.content || "내용을 입력해 주세요."}
          </h2>
          <Template02ContentRich
            dangerouslySetInnerHTML={{
              __html:
                sub_sentence.content ||
                "<div className='text-center'><p>내용을 입력해 주세요.</p></div>",
            }}
            color={sub_sentence.color}
          ></Template02ContentRich>
          <div className="grid grid-cols-3 gap-5 mt-5 relative">
            <div className=" relative" style={{ width: 190, height: 190 }}>
              <div
                className="bg-gray400 z-10 relative rounded-br-xl rounded-tl-xl w-full h-full overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                style={{
                  boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
                  backgroundImage: image1.image?.url
                    ? `url(${image1.image.url})`
                    : undefined,
                }}
              ></div>
            </div>
            <div className=" relative" style={{ width: 190, height: 190 }}>
              <div
                className="bg-gray400 z-10 relative rounded-br-xl rounded-tl-xl w-full h-full overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                style={{
                  boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
                  backgroundImage: image2.image?.url
                    ? `url(${image2.image.url})`
                    : undefined,
                }}
              ></div>
            </div>
            <div className=" relative" style={{ width: 190, height: 190 }}>
              <div
                className="bg-gray400 z-10 relative rounded-br-xl rounded-tl-xl w-full h-full overflow-hidden !bg-no-repeat !bg-cover !bg-center"
                style={{
                  boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
                  backgroundImage: image3.image?.url
                    ? `url(${image3.image.url})`
                    : undefined,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
