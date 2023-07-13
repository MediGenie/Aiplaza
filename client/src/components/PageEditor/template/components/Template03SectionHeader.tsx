import classNames from "classnames";
import { FC, useMemo } from "react";
import { Template03Header } from "../../../../assets";
import {
  PageImageColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";

interface Template03SectionHeaderProps {
  readonly?: boolean;
}

export const Template03SectionHeader: FC<Template03SectionHeaderProps> = ({
  readonly,
}) => {
  const page = usePageValue();
  const { getColumn, selectSection } = usePageDispatch();

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
    <div onClick={handleSelect}>
      <div className="relative cursor-pointer">
        <img src={Template03Header} alt="" />
        <div
          className="absolute z-2 pr-12"
          style={{ top: "62px", left: "58px" }}
        >
          <h1
            className="font-bold text-h2 max-h-[48px] overflow-hidden"
            style={{ color: title.color, marginBottom: 5 }}
          >
            {title.content || "입력해 주세요."}
          </h1>
          <p
            className="font-bold text-b2 whitespace-pre-line max-h-[48px] overflow-hidden"
            style={{ color: subSentence.color, maxWidth: 400 }}
          >
            {subSentence.content || "설명을 입력해 주세요."}
          </p>
        </div>
      </div>
    </div>
  );
};
