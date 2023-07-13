import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  blackLeftArrow,
  blueRightArrow,
  grayRightArrow,
} from "../../../../../icons";
import { useServiceFormContext } from "../hooks/useServiceFormContext";

interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const { step, onChangeStep, form_data } = useServiceFormContext();
  const navigate = useNavigate();
  const handlePrev = () => {
    if (step === 1) {
      return;
    }
    onChangeStep(step - 1);
  };
  const formik = useFormikContext();

  const handleNext = () => {
    const total_step = form_data.length;
    if (total_step > step) {
      onChangeStep(step + 1);
    } else {
      formik.submitForm();
    }
  };

  return (
    <div className="bg-white py-5 px-10 border-b border-gray200 flex items-center justify-center sticky top-0 inset-x-0 z-10 overflow-hidden">
      <div className="flex absolute left-10 space-x-[5px]">
        <button type="button" onClick={() => navigate(-1)}>
          <img src={blackLeftArrow} className="w-5" alt="이전" />
        </button>
        <h1 className="font-bold text-b1  overflow-hidden break-words line-clamp-2">
          {title || "서비스명을 입력해 주세요."}
        </h1>
      </div>
      <div className="flex space-x-5">
        {form_data.map((_, section_index) => {
          const item = section_index + 1;
          return (
            <>
              <div
                className={classNames(
                  "w-6 h-6 rounded border flex font-medium items-center justify-center",
                  {
                    "border-blue500 text-blue500": step === item,
                    "border-gray400 text-gray400": step !== item,
                  }
                )}
              >
                {item}
              </div>
              {item !== form_data.length && (
                <img
                  src={step === item ? blueRightArrow : grayRightArrow}
                  alt=""
                />
              )}
            </>
          );
        })}
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
          {form_data.length > step ? "다음" : "제출"}
        </button>
      </div>
    </div>
  );
};
