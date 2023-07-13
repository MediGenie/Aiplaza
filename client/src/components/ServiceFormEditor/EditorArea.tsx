import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { FC, useMemo } from "react";
import { grayDownTriangle, section02 } from "../../icons";
import { EditorAreaSetting } from "./EditorAreaSetting";
import { useFormDispatchContext } from "./hooks/useFormDispatchContext";
import { useFormValueContext } from "./hooks/useFormValueContext";
import { ColumnTypeToIconMap } from "./icons";
import { FormColumnType, ServiceFormColumn, ServiceFormSection } from "./types";

interface EditorAreaProps {}

const TYPE = [
  FormColumnType.TITLE,
  FormColumnType.NUMBER,
  FormColumnType.TEXT,
  FormColumnType.FILE,
  FormColumnType.DROPROWN,
  FormColumnType.RADIO,
  FormColumnType.CHECKBOX,
  FormColumnType.SLIDE,
  FormColumnType.SPINNER,
  FormColumnType.LINEAR,
];

const TypeToStrMap: Record<FormColumnType, string> = {
  [FormColumnType.TITLE]: "제목 및 설명",
  [FormColumnType.TEXT]: "텍스트필드",
  [FormColumnType.NUMBER]: "숫자필드",
  [FormColumnType.FILE]: "파일업로드",
  [FormColumnType.DROPROWN]: "드롭다운",
  [FormColumnType.RADIO]: "라디오 버튼",
  [FormColumnType.CHECKBOX]: "체크박스",
  [FormColumnType.SLIDE]: "슬라이드",
  [FormColumnType.SPINNER]: "스피너",
  [FormColumnType.LINEAR]: "선형배율",
};
const TypeToInitDataMap: Record<FormColumnType, any> = {
  [FormColumnType.TITLE]: {
    type: FormColumnType.TITLE,
    description: "",
    label: "",
    image: null,
  },
  [FormColumnType.TEXT]: {
    type: FormColumnType.TEXT,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
  },
  [FormColumnType.NUMBER]: {
    type: FormColumnType.NUMBER,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
  },
  [FormColumnType.FILE]: {
    type: FormColumnType.FILE,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    allow_mime: [],
    limit_file_number: 1,
    limit_file_size: 1,
  },
  [FormColumnType.DROPROWN]: {
    type: FormColumnType.DROPROWN,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    items: ["", ""],
  },
  [FormColumnType.RADIO]: {
    type: FormColumnType.RADIO,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    etc_field: false,
    items: ["", ""],
  },
  [FormColumnType.CHECKBOX]: {
    type: FormColumnType.CHECKBOX,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    etc_field: false,
    items: ["", ""],
    max_checkbox_count: 1,
  },
  [FormColumnType.SLIDE]: {
    type: FormColumnType.SLIDE,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    min_slide: 0,
    max_slide: 100,
    fixed_slide: true,
  },
  [FormColumnType.SPINNER]: {
    type: FormColumnType.SPINNER,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    spinner_init: 0,
  },
  [FormColumnType.LINEAR]: {
    type: FormColumnType.LINEAR,
    description: "",
    label: "",
    image: null,
    table: null,
    required: false,
    max_linear: 10,
    min_linear: 0,
    max_linear_label: "10",
    min_linear_label: "0",
  },
};

export const EditorArea: FC<EditorAreaProps> = () => {
  const { select_item } = useFormValueContext();
  const dispatch = useFormDispatchContext();

  const item = useMemo(() => {
    if (select_item === null) {
      return null;
    }
    // @ts-ignore
    return dispatch.getItem(select_item.section, select_item.column);
  }, [dispatch, select_item]);

  const handleChangeType = (next: FormColumnType) => {
    if (select_item && select_item.column) {
      dispatch.updateItem({
        section: select_item.section,
        column: select_item.column,
        data: TypeToInitDataMap[next],
        replace: true,
      });
    }
  };

  if (item === null) {
    return (
      <div className="py-5 px-10 w-[390px] border-l border-gray200 relative">
        <p className="font-medium text-b2">수정할 항목을 선택해 주세요.</p>
      </div>
    );
  }

  if (Object.hasOwn(item, "column") && (item as ServiceFormSection).column) {
    return (
      <div className="w-[390px] border-l border-gray200 relative bg-white max-lg:w-full">
        <div className="px-10 py-5">
          <h2 className="font-semibold text-b1 mb-2.5">타입</h2>
          <div className="border border-gray300 px-[15px] py-3 rounded flex justify-between items-center">
            <div className="flex space-x-[5px] items-center">
              <div className="bg-gray100 rounded p-1">
                <img src={section02} className="w-4 h-4" alt="" />
              </div>
              <p className="text-b3">섹션</p>
            </div>
            <img src={grayDownTriangle} className="w-4 h-4" alt="" />
          </div>
        </div>
        <div className="h-1 bg-gray100"></div>
      </div>
    );
  }

  const _item: ServiceFormColumn = item as ServiceFormColumn;

  return (
    <div className="w-[390px] border-l border-gray200 relative bg-white max-md:w-full max-md:h-full max-xl:overflow-auto">
      <div className="px-10 py-5">
        <h2 className="font-semibold text-b1 mb-2.5">타입</h2>
        <Listbox value={_item.type} onChange={handleChangeType}>
          <div className="relative">
            <Listbox.Button
              className={({ open }) =>
                classNames(
                  "border border-gray300 px-[15px] py-3 rounded flex justify-between items-center w-full",
                  { "rounded-b-none": open }
                )
              }
            >
              <div className="flex space-x-[5px] items-center">
                <div className="bg-gray100 rounded p-1">
                  <img
                    src={ColumnTypeToIconMap[_item.type]}
                    className="w-4 h-4"
                    alt="아이콘"
                  />
                </div>
                <p className="text-b3">{TypeToStrMap[_item.type]}</p>
              </div>
              <img src={grayDownTriangle} className="w-4 h-4" alt="" />
            </Listbox.Button>
            <div>
              <Listbox.Options
                className="absolute border border-t-0 border-gray300 rounded-b left-0 right-0 overflow-auto max-md:overflow-visible z-10"
                style={{ maxHeight: 320 }}
              >
                {TYPE.map((item, itemIndex) => {
                  return (
                    <Listbox.Option
                      value={item}
                      key={itemIndex}
                      className={({ active }) =>
                        classNames(
                          "hover:bg-gray50 px-[15px] py-3 cursor-pointer",
                          {
                            "bg-white": active === false,
                            "bg-gray50": active === true,
                          }
                        )
                      }
                    >
                      {({ active }) => {
                        return (
                          <span
                            className={classNames("text-b3", {
                              "text-blue500": active === true,
                              "text-gray600": active === false,
                            })}
                          >
                            {TypeToStrMap[item]}
                          </span>
                        );
                      }}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </div>
          </div>
        </Listbox>
      </div>
      <div className="h-1 bg-gray100"></div>
      <div className="px-10 py-5">
        <div className="border-b border-gray100 mb-5">
          <h2 className="font-semibold text-b1 mb-2.5">설정</h2>
        </div>
        <div>
          {select_item !== null && (
            <EditorAreaSetting
              column={select_item.column as number}
              section={select_item.section}
            />
          )}
        </div>
      </div>
    </div>
  );
};
