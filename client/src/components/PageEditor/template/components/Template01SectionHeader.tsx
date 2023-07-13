import classNames from "classnames";
import { FC, useMemo } from "react";
import {
  PageImageColumn,
  PageSentenceColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";

interface Template01SectionHeaderProps {
  readonly?: boolean;
}

export const Template01SectionHeader: FC<Template01SectionHeaderProps> = ({
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

  const profileIcon = useMemo(() => {
    return (getColumn("HEADER", "PROFILE_ICON") as PageImageColumn) || {};
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
      <div
        style={{
          minHeight: 220,
          background: background.image?.url
            ? `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background.image.url})`
            : undefined,
          padding: 65,
        }}
        className={classNames(
          "bg-gray400 rounded-b-2xl !bg-center !bg-cover !bg-no-repeat flex flex-col items-center justify-center",
          {
            "cursor-pointer": readonly !== true,
          }
        )}
      >
        <h1
          className="max-w-[600px] font-bold text-h2 text-center whitespace-pre-line break-words"
          style={{ color: title.color, marginBottom: 5 }}
        >
          {title.content || "입력해 주세요."}
        </h1>
        <p
          className="max-w-[600px] font-bold text-b2 whitespace-pre-line text-center break-words"
          style={{ color: subSentence.color }}
        >
          {subSentence.content || "설명을 입력해 주세요."}
        </p>
      </div>
      <div
        className="mx-auto rounded-full border border-white bg-gray400 shadow-black"
        style={{
          width: 120,
          height: 120,
          borderWidth: 6,
          marginTop: -60,
          zIndex: 5,
        }}
      >
        {profileIcon.image?.url && (
          <div
            className="w-full h-full !bg-center !bg-cover !bg-no-repeat rounded-full"
            style={{
              background: `url(${profileIcon.image.url})`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};
