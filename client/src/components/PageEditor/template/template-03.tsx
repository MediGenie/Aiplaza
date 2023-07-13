import { FC } from "react";
import { Template03Content01 } from "./components/Template03Content01";
import { Template03Content02 } from "./components/Template03Content02";
import { Template03Content03 } from "./components/Template03Content03";

import { Template03SectionHeader } from "./components/Template03SectionHeader";
import { Template03Content04 } from "./components/Template03Content04";
import { Template03ItemDecorator3 } from "../../../assets";

interface Template03Props {
  readonly?: boolean;
}

export const Template03: FC<Template03Props> = ({ readonly }) => {
  return (
    <div
      className="mx-auto bg-white border border-gray100 rounded-b-lg overflow-hidden"
      style={{ width: 730 }}
    >
      <Template03SectionHeader readonly={readonly} />
      <Template03Content01 readonly={readonly} />
      <div className="mt-2.5">
        <Template03Content02 readonly={readonly} />
      </div>
      <div className="min-h-[370px] mt-[30px] bg-gradient-to-b from-[#9747FF] to-blue500 relative overflow-hidden">
        <Template03Content03 readonly={readonly} />
        <img
          src={Template03ItemDecorator3}
          className="absolute bottom-0"
          alt=""
        />
      </div>
      <Template03Content04 />
    </div>
  );
};
