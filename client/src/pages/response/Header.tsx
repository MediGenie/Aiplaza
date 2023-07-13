import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { blackLeftArrow } from "../../icons";
import { ServiceRequestResponseType } from "../../types/service-response.type";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { MyDoc } from "./Doc";

interface HeaderProps {
  data: ServiceRequestResponseType;
  title?: string;
  response_title?: string;
}

export const Header: FC<HeaderProps> = ({ title, response_title, data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white grid grid-cols-3  items-center justify-between py-3 px-10 max-md:px-5 border-b border-gray200 sticky top-0 inset-x-0 z-10">
      <div className=" flex items-center space-x-[5px] ">
        <button className="w-[20px]" type="button" onClick={() => navigate(-1)}>
          <img src={blackLeftArrow} className="w-5" alt="이전" />
        </button>
        <p className="font-bold text-b1 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </p>
      </div>
      <p className="text-b3 text-center font-medium">{response_title}</p>
      <div className="flex justify-end">
        <button className="text-center text-b2 text-white bg-blue500 w-[129px] h-10 rounded">
          <PDFDownloadLink
            document={<MyDoc data={data} response_title={response_title} />}
            fileName={`${response_title}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "PDF문서 생성중" : "PDF 다운로드"
            }
          </PDFDownloadLink>
        </button>
      </div>
    </div>
  );
};
