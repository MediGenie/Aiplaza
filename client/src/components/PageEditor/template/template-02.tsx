import { FC } from "react";
import { Template02Content01 } from "./components/Template02Content01";
import { Template01Content04 } from "./components/Template01Content04";
import { Template02SectionHeader } from "./components/Template02SectionHeader";
import { Template02Content02 } from "./components/Template02Content02";
import { Template02Content03 } from "./components/Template02Content03";
import { Template02ContentItem03 } from "./components/Template02ContentItem03";
import { Template02ContentItem02 } from "./components/Template02ContentItem02";
import { Template02ContentItem01 } from "./components/Template02ContentItem01";
import {
  Template02C3ItemDecorator,
  Template02C3ItemDecorator2,
} from "../../../assets";

interface Template02Props {
  readonly?: boolean;
}

export const Template02: FC<Template02Props> = ({ readonly }) => {
  return (
    <div
      className="mx-auto bg-white border border-gray100 rounded-lg overflow-auto"
      style={{ width: 730 }}
    >
      <Template02SectionHeader readonly={readonly} />

      <div className="px-15 pb-[140px] mt-[100px]">
        <Template02Content01 readonly={readonly} />
      </div>
      <div
        className="px-15 rounded-tl-[60px] rounded-br-[60px]"
        style={{
          background: "linear-gradient(180deg, #0262CD 0%, #002956 100%)",
        }}
      >
        <Template02Content02 readonly={readonly} />
      </div>
      <div className="p-15 relative">
        <img
          className="absolute bottom-0 left-0"
          src={Template02C3ItemDecorator}
          alt=""
        />
        <img
          className="absolute  right-0"
          src={Template02C3ItemDecorator2}
          alt=""
        />
        <Template02Content03 readonly={readonly} />
      </div>
      <div className="bg-gray100 py-15 ">
        <Template01Content04 readonly={readonly} />
      </div>
    </div>
  );
};
