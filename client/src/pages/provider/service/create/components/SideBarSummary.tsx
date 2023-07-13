import { FC } from "react";
import { useServiceCreateContext } from "../hooks/useServiceCreateContext";

interface SideBarSummaryProps {}

export const SideBarSummary: FC<SideBarSummaryProps> = () => {
  const {
    data: { content },
  } = useServiceCreateContext();
  return (
    <div className="py-5 px-10 space-x-2.5 flex border-b-4 border-gray100">
      <div
        className="bg-gray200 rounded-lg overflow-hidden min-w-[78px]"
        style={{ width: 78, height: 78 }}
      >
        {content?.thumbnail && (
          <img
            src={(content.thumbnail as File & { url: string }).url}
            className="w-full h-full object-cover"
            alt="썸네일"
          />
        )}
      </div>
      <div className="max-w-[221px] max-xl:max-w-full overflow-hidden">
        <h2 className="text-b1 font-semibold break-words line-clamp-2">
          {content.title || "서비스명을 입력해 주세요."}
        </h2>
        <p className="text-b3 text-gray600 whitespace-pre-line break-words line-clamp-2">
          {content.description || "서비스 소개를 입력해 주세요."}
        </p>
      </div>
    </div>
  );
};
