import { FC } from "react";
import { ServiceFormContentManager } from "../../../../../components/ServiceFormEditor";
import { ServiceFormSection } from "../../../../../components/ServiceFormEditor/types";
import { useServiceEditContext } from "../hooks/useServiceEditContext";
import { SideBarSummary } from "./SideBarSummary";

interface SideBarProps {}

const SideBarTitleMap: Record<number, string> = {
  1: "기본정보 등록",
  2: "소개페이지",
  3: "파일등록",
  4: "응답폼 제작",
};

export const SideBar: FC<SideBarProps> = () => {
  const {
    step,
    data: { form },
    onChangeData,
  } = useServiceEditContext();

  const updateData = (next: ServiceFormSection[]) => {
    onChangeData({
      form: next,
    });
  };

  return (
    <div className="bg-white border-r border-gray200 relative w-full overflow-auto max-w-[390px] max-xl:max-w-full">
      <div className="bg-blue500 border-b border-gray200 flex justify-center items-center p-5 space-x-2.5">
        <div className="w-6 h-6 border border-white rounded flex items-center justify-center">
          <span className="text-b3 font-medium text-white">{step}</span>
        </div>
        <h1 className="text-b3 text-white">
          {SideBarTitleMap[step] || "알 수 없음"}
        </h1>
      </div>
      <SideBarSummary />
      <div className="px-10 max-xl:hidden">
        {step === 4 && (
          <ServiceFormContentManager
            changeSections={updateData}
            sections={form}
          />
        )}
      </div>
    </div>
  );
};
