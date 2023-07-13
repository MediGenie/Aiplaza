import { FC } from "react";
import { SectionEditor } from "./components/SectionEditor";
import { useFormValueContext } from "./hooks/useFormValueContext";
interface FormAreaProps {}

export const FormArea: FC<FormAreaProps> = () => {
  const { data } = useFormValueContext();

  return (
    <div className="flex-1 py-10 bg-gray50 overflow-auto max-md:overflow-visible max-md:max-h-full">
      <div className="container-sm space-y-5">
        {data.map((section, index) => {
          return (
            <SectionEditor
              section={section}
              index={index}
              total={data.length}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
