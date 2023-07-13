import classNames from "classnames";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../../../apis/api-error";
import { providerServiceApis } from "../../../../../apis/service";
import {
  blackLeftArrow,
  blueRightArrow,
  grayRightArrow,
} from "../../../../../icons";
import { IsUndefined } from "../../../../../lib/IsUndefined";
import { MaxLength } from "../../../../../lib/MaxLength";
import { AlertModal } from "../../../../../modals";
import { ColumnTypeEnum } from "../../../../../types/page-column.type";
import { useServiceCreateContext } from "../hooks/useServiceCreateContext";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { step, onChangeStep, data } = useServiceCreateContext();
  const title = data.content.title;
  const navigate = useNavigate();
  const [modal, setModal] = useState({ message: "", show: false });
  const showModal = (msg: string) => {
    setModal({
      message: msg,
      show: true,
    });
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };

  const handleStep1Next = () => {
    // va
    const values = data.content;
    if (IsUndefined(values.title)) {
      return showModal("서비스 제목을 입력해주세요.");
    }
    if (IsUndefined(values.description)) {
      return showModal("서비스 소개를 입력해주세요.");
    }
    if (IsUndefined(values.thumbnail)) {
      return showModal("썸네일을 등록해 주세요.");
    }
    if (IsUndefined(values.email)) {
      return showModal("담당 메일 주소를 입력해주세요.");
    }
    if (IsUndefined(values.price) || values.price === 0) {
      return showModal("서비스 금액을 입력해주세요.");
    }
    // 넘기기
    onChangeStep(2);
  };
  const handleStep2Next = () => {
    // va
    const values = data.page.data;
    let error = "";
    Object.values(values).forEach((value) => {
      value.columns.map((v) => {
        if (v.type === ColumnTypeEnum.Color) {
          if (IsUndefined(v.color)) {
            error =
              value.label + "의 " + v.label + "(이)가 입력되지 않았습니다.";
          }
        } else if (v.type === ColumnTypeEnum.Image) {
          if (IsUndefined(v.image)) {
            error =
              value.label + "의 " + v.label + "(이)가 입력되지 않았습니다.";
          }
        } else if (v.type === ColumnTypeEnum.Rich) {
          if (IsUndefined(v.content) || IsUndefined(v.color)) {
            error =
              value.label + "의 " + v.label + "(이)가 입력되지 않았습니다.";
          }
        } else if (v.type === ColumnTypeEnum.Sentence) {
          if (IsUndefined(v.content) || IsUndefined(v.color)) {
            error =
              value.label + "의 " + v.label + "(이)가 입력되지 않았습니다.";
          }
          if (value.label === "해더3" && MaxLength(v.content.length, 20)) {
            error = "해더의 " + v.label + "길이는 20자 이하입니다.";
          }
        } else if (v.type === ColumnTypeEnum.Text) {
          if (IsUndefined(v.content) || IsUndefined(v.color)) {
            error =
              value.label + "의 " + v.label + "(이)가 입력되지 않았습니다.";
          }
          if (value.label === "해더3" && MaxLength(v.content.length, 60)) {
            error = "해더의 " + v.label + "길이는 60자 이하입니다.";
          }
        }
      });
    });
    // 넘기기
    if (IsUndefined(error) === false) {
      return showModal(`${error}`);
    }
    onChangeStep(3);
  };
  const handleStep3Next = () => {
    // va
    if (IsUndefined(data.service_file)) {
      return showModal(`파일이 업로드 되지 않았습니다.`);
    }
    // 넘기기
    onChangeStep(4);
  };
  const handleStep4Next = () => {
    // 여기서 검증
    for (let i = 0; i < data.form.length; i++) {
      const section = data.form[i];
      if (IsUndefined(section.label.trim())) {
        return showModal(`섹션 ${i + 1}의 섹션명을 입력해주세요.`);
      }
      for (let j = 0; j < section.column.length; j++) {
        const column = section.column[j];
        if (IsUndefined(column.label.trim())) {
          return showModal(
            `섹션 ${i + 1}, ${j + 1} 항목의 제목을 입력해주세요.`
          );
        }
      }
    }

    const fd = new FormData();
    // 서비스 제목 소개 썸네일 주소 금액
    fd.append("content[title]", data.content.title);
    fd.append("content[description]", data.content.description);
    if (data.content.thumbnail) {
      fd.append("THUMBNAIL", data.content.thumbnail);
    }
    fd.append("content[email]", data.content.email);
    fd.append("content[price]", data.content.price.toString());
    // 서비스 페이지 템플릿
    fd.append("template", data.page.template);

    for (let i = 0; i < data.page.data.length; i++) {
      const field = `page[${i}]`;
      const row = data.page.data[i];
      fd.append(`${field}[key]`, row.key);
      fd.append(`${field}[label]`, row.label);
      for (let j = 0; j < row.columns.length; j++) {
        const column = row.columns[j];

        if (column.type === ColumnTypeEnum.Image) {
          const file_field = `PAGE_${row.label}_${column.label}`;
          const { image, ...rest } = column;
          if (image && image instanceof File) {
            fd.append(file_field, image);
            fd.append(`${field}[column][${j}][image]`, file_field);
          }
          Object.entries(rest).forEach(([f, v]) => {
            fd.append(`${field}[column][${j}][${f}]`, v.toString());
          });
        } else {
          Object.entries(column).forEach(([f, v]) => {
            fd.append(`${field}[column][${j}][${f}]`, v.toString());
          });
        }
      }
    }

    // 서비스 파일
    if (data.service_file) {
      fd.append("SERVICE_FILE", data.service_file);
    }

    // 응답 폼
    for (let i = 0; i < data.form.length; i++) {
      const field = `form[${i}]`;
      const row = data.form[i];
      fd.append(`${field}[label]`, row.label);
      fd.append(`${field}[description]`, row.description);
      for (let j = 0; j < row.column.length; j++) {
        const column_field = `${field}[column][${j}]`;
        const column = row.column[j];
        const { image, ...rest } = column;
        if (image && image instanceof File) {
          const file_field = `SECTION_${i}_COLUMN_${j}`;
          fd.append(file_field, image);
          fd.append(`${column_field}[image]`, file_field);
        }
        Object.entries(rest).forEach(([f, v]) => {
          fd.append(`${field}[column][${j}][${f}]`, JSON.stringify(v));
        });
      }
    }

    // 생성 요청
    providerServiceApis
      .create(fd)
      .then(() => {
        navigate("/provider/service");
      })
      .catch((e: ApiError) => {
        return showModal(e.message);
      });
  };

  const handleNext = () => {
    switch (step) {
      case 1:
        handleStep1Next();
        break;
      case 2:
        handleStep2Next();
        break;
      case 3:
        handleStep3Next();
        break;
      case 4:
        handleStep4Next();
        break;
      default:
        break;
    }
  };
  const handlePrev = () => {
    if (step === 1) {
      return;
    }
    onChangeStep(step - 1);
  };

  return (
    <div className="bg-white grid grid-cols-3  items-center justify-between py-5 px-10 border-b border-gray200 sticky top-0 inset-x-0 z-30 overflow-hidden ">
      <div className="flex justify-start items-center space-x-[5px]">
        <button onClick={() => navigate(-1)} type="button">
          <img
            src={blackLeftArrow}
            className="min-w-[20px] h-[20px]"
            alt="이전"
          />
        </button>
        <h1 className="font-bold text-b1 line-clamp-2">
          {title || "서비스명을 입력해 주세요."}
        </h1>
      </div>
      <div className="flex justify-center space-x-5">
        <div
          className={classNames(
            "w-6 h-6 rounded border flex font-medium items-center justify-center",
            {
              "border-blue500 text-blue500": step === 1,
              "border-gray400 text-gray400 max-lg:hidden": step !== 1,
            }
          )}
        >
          1
        </div>
        <img
          className="max-lg:hidden"
          src={step === 1 ? blueRightArrow : grayRightArrow}
          alt=""
        />
        <div
          className={classNames(
            "w-6 h-6 rounded border flex font-medium items-center justify-center",
            {
              "border-blue500 text-blue500": step === 2,
              "border-gray400 text-gray400 max-lg:hidden": step !== 2,
            }
          )}
        >
          2
        </div>
        <img
          className="max-lg:hidden"
          src={step === 2 ? blueRightArrow : grayRightArrow}
          alt=""
        />
        <div
          className={classNames(
            "w-6 h-6 rounded border flex font-medium items-center justify-center",
            {
              "border-blue500 text-blue500": step === 3,
              "border-gray400 text-gray400 max-lg:hidden": step !== 3,
            }
          )}
        >
          3
        </div>
        <img
          className="max-lg:hidden"
          src={step === 3 ? blueRightArrow : grayRightArrow}
          alt=""
        />
        <div
          className={classNames(
            "w-6 h-6 rounded border flex font-medium items-center justify-center",
            {
              "border-blue500 text-blue500": step === 4,
              "border-gray400 text-gray400 max-lg:hidden": step !== 4,
            }
          )}
        >
          4
        </div>
      </div>
      <div className="flex absolute right-10 space-x-2.5">
        {step > 1 && (
          <button
            className="bg-gray400 text-white py-2 px-5 rounded font-medium"
            type="button"
            onClick={handlePrev}
          >
            이전
          </button>
        )}
        <button
          className="bg-blue500 text-white py-2 px-5 rounded font-medium"
          type="button"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
      <AlertModal
        open={modal.show}
        message={modal.message}
        title="알림"
        onClose={hideModal}
      />
    </div>
  );
};
