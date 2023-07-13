import { FC } from "react";
import {
  Template01Preview,
  Template02Preview,
  Template03Preview,
} from "../../assets";
import { templateIdEnum } from "./enum/template-id";
import { ThemeCard } from "./ThemeCard";
import { usePageDispatch } from "./usePageDispatch";
import { usePageValue } from "./usePageValue";

interface ThemeTabProps {}

export const ThemeTab: FC<ThemeTabProps> = () => {
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();

  return (
    <div className="py-5 px-10 space-y-5 max-lg:space-y-0 max-lg:flex max-lg:space-x-5 max-md:flex-col max-md:justify-center max-md:items-center max-md:space-x-0 max-md:space-y-5">
      <ThemeCard
        image={Template01Preview}
        isActive={pageValue.template === templateIdEnum.TEMPLATE_1}
        title="The universe"
        onClick={() => {
          dispatch.changeTemplate(templateIdEnum.TEMPLATE_1);
        }}
        background="#1c1c1e"
      />
      <ThemeCard
        image={Template02Preview}
        isActive={pageValue.template === templateIdEnum.TEMPLATE_2}
        title="Blue Circle"
        onClick={() => {
          dispatch.changeTemplate(templateIdEnum.TEMPLATE_2);
        }}
        background="#E5F4FF"
      />
      <ThemeCard
        image={Template03Preview}
        isActive={pageValue.template === templateIdEnum.TEMPLATE_3}
        title="Science Wave"
        onClick={() => {
          dispatch.changeTemplate(templateIdEnum.TEMPLATE_3);
        }}
        background="linear-gradient(180deg, rgba(12, 118, 255, 0.5) 0%, rgba(147, 72, 255, 0.5) 100%)"
      />
    </div>
  );
};
