import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <div className="bg-gray50 py-20">
      <div className="container">
        <p className="text-b3 text-gray600 text-center">
          사업자등록번호 : - | 통신판매업신고번호 : - | 대표자 : - | 주소 :
          서울특별시 서대문구 연세로 50-1 의과대학 4층 핵의학교실 | 대표전화 :
          02-2228-2363 |{" "}
          <Link to="/board" className="underline underline-offset-2">
            공지사항
          </Link>
        </p>
        <p className="text-center text-gray400 text-b3 mt-5">
          Copyright © 2022 MoNET AI Plaza
        </p>
      </div>
    </div>
  );
};
