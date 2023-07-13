import { Tab } from "@headlessui/react";
import { FC } from "react";
import classNames from "classnames";
import { EditTab } from "./EditTab";
import { ThemeTab } from "./ThemeTab";

interface EditAreaProps {}

export const EditArea: FC<EditAreaProps> = () => {
  return (
    <div className="min-w-[390px] border-l border-gray200 relative">
      <Tab.Group>
        <Tab.List className="flex sticky top-0 left-0 right-0 z-20">
          <Tab
            className={({ selected }) =>
              classNames(
                "flex-1 p-5 bg-white outline-none relative before:absolute before:inset-x-0 before:bottom-0",
                {
                  "before:border-b-2 before:border-b-black": selected === true,
                  "before:border-b before:border-b-gray200": selected === false,
                }
              )
            }
          >
            {({ selected }) => {
              return (
                <span
                  className={classNames("text-b2", {
                    "font-medium": selected,
                    "text-gray400": selected === false,
                  })}
                >
                  편집
                </span>
              );
            }}
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "flex-1 p-5 bg-white outline-none relative before:absolute before:inset-x-0 before:bottom-0",
                {
                  "before:border-b-2 before:border-b-black": selected === true,
                  "before:border-b before:border-b-gray200": selected === false,
                }
              )
            }
          >
            {({ selected }) => {
              return (
                <span
                  className={classNames("text-b2", {
                    "font-medium": selected,
                    "text-gray400": selected === false,
                  })}
                >
                  테마
                </span>
              );
            }}
          </Tab>
        </Tab.List>
        <Tab.Panels className="overflow-h-auto">
          <Tab.Panel>
            <EditTab />
          </Tab.Panel>
          <Tab.Panel>
            <ThemeTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
