import { FC } from "react";
import { templateIdEnum } from "./enum/template-id";
import { Template01 } from "./template/template-01";
import { Template02 } from "./template/template-02";
import { Template03 } from "./template/template-03";
import { usePageValue } from "./usePageValue";

interface PageViewProps {
  readonly?: boolean;
}

const Template: Record<templateIdEnum, FC<any>> = {
  [templateIdEnum.TEMPLATE_1]: Template01,
  [templateIdEnum.TEMPLATE_2]: Template02,
  [templateIdEnum.TEMPLATE_3]: Template03,
};

export const PageView: FC<PageViewProps> = ({ readonly = false }) => {
  const { template } = usePageValue();
  const Component = Template[template];

  return (
    <div className="flex-1 py-10 bg-gray50">
      {Component && <Component readonly={readonly} />}
    </div>
  );
};
