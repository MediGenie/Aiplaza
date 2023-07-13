import { FC } from "react";
import { Template01Content01 } from "./components/Template01Content01";
import { Template01Content02 } from "./components/Template01Content02";
import { Template01Content03 } from "./components/Template01Content03";
import { Template01Content04 } from "./components/Template01Content04";
import { Template01SectionHeader } from "./components/Template01SectionHeader";
import { Template01SectionItem01 } from "./components/Template01SectionItem01";
import { Template01SectionItem02 } from "./components/Template01SectionItem02";
import { Template01SectionItem03 } from "./components/Template01SectionItem03";

interface Template01Props {
  readonly?: boolean;
}

export const Template01: FC<Template01Props> = ({ readonly }) => {
  return (
    <div
      className="mx-auto bg-white border border-gray100 rounded-b-lg overflow-auto"
      style={{ width: 730 }}
    >
      <Template01SectionHeader readonly={readonly} />
      <div
        className="grid grid-cols-3 gap-5 px-15"
        style={{ marginTop: 30, marginBottom: 60 }}
      >
        <Template01SectionItem01 readonly={readonly} />
        <Template01SectionItem02 readonly={readonly} />
        <Template01SectionItem03 readonly={readonly} />
      </div>
      <div
        className="bg-black"
        style={{ borderRadius: "60px 60px 10px 10px", padding: "60px 0" }}
      >
        <Template01Content01 readonly={readonly} />
        <div className="mt-20">
          <Template01Content02 readonly={readonly} />
        </div>
        <div className="mt-15">
          <Template01Content03 readonly={readonly} />
        </div>
        <div className="mt-10">
          <Template01Content04 readonly={readonly} />
        </div>
      </div>
    </div>
  );
};
