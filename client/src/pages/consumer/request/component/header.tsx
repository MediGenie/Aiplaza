import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { blackLeftArrow } from "../../../../icons";

interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white grid grid-cols-3 max-md:grid-cols-none max-md:flex items-center justify-between py-5 px-10 border-b border-gray200 sticky top-0 inset-x-0 z-10">
      <div className="flex justify-start items-center space-x-[5px] ">
        <button type="button" onClick={() => navigate(-1)}>
          <img src={blackLeftArrow} className="w-5" alt="이전" />
        </button>
        <h1 className="font-bold text-b1">{title}</h1>
      </div>
      <p className="text-b3 text-center font-medium max-md:text-right">
        응답보기
      </p>
      <div className="max-md:hidden">{""}</div>
    </div>
  );
};
