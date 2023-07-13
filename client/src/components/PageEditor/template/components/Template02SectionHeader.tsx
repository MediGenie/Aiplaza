import classNames from "classnames";
import { FC, useMemo } from "react";
import {
  PageImageColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";

interface Template02SectionHeaderProps {
  readonly?: boolean;
}

export const Template02SectionHeader: FC<Template02SectionHeaderProps> = ({
  readonly,
}) => {
  const page = usePageValue();
  const { getColumn, selectSection } = usePageDispatch();

  const background = useMemo(() => {
    return (getColumn("HEADER", "BG") as PageImageColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const title = useMemo(() => {
    return (getColumn("HEADER", "TITLE") as PageSentenceColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const subSentence = useMemo(() => {
    return (getColumn("HEADER", "SUB_SENTENCE") as PageSentenceColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const handleSelect = () => {
    if (readonly === true) {
      return;
    }
    selectSection("HEADER");
  };

  return (
    <div onClick={handleSelect} >
      <div className="max-w-[728px] w-full flex items-center space-x-2.5 rounded-t-lg bg-black h-[28px]">
        <div className="ml-[15px] w-[10px] h-[10px] bg-[#FF3B30] rounded-full z-10"></div>
        <div className="w-[10px] h-[10px] bg-[#FFC240] rounded-full z-10"></div>
        <div className="w-[10px] h-[10px] bg-[#00C968] rounded-full z-10"></div>
      </div>
      <div
        style={{
          minHeight: 237,
          background: background.image?.url
            ? `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background.image.url})`
            : undefined,
        }}
        className={classNames(
          "bg-gray400 rounded-br-[60px] !bg-center !bg-cover !bg-no-repeat px-15 py-20",
          {
            "cursor-pointer": readonly !== true,
          }
        )}
      >
        <h1
          className="font-bold text-h2"
          style={{ color: title.color, marginBottom: 5 }}
        >
          {title.content || "입력해 주세요."}
        </h1>
        <p
          className="text-b2 whitespace-pre-line"
          style={{ color: subSentence.color, fontWeight:500 }}
        >
          {subSentence.content || "설명을 입력해 주세요."}
        </p>
      </div>
    </div>
  );
};
