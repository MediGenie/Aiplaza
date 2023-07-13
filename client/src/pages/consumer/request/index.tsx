import { PDFDownloadLink } from "@react-pdf/renderer";
import classNames from "classnames";
import moment from "moment-timezone";
import { FC, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../../../apis/api-error";
import { consumerRequestApis } from "../../../apis/request";
import { FilterButton, SearchIcon } from "../../../assets";
import Pagination from "../../../components/Pagination/Pagination";
import { Select } from "../../../components/SelectButton/Select";
import {
  download,
  GrayDownload,
  GrayWatch,
  WhiteDownload,
  WhiteWatch,
} from "../../../icons";
import { AlertModal } from "../../../modals";
import { BoardType } from "../../../types/board.types";
import { PaginateData } from "../../../types/paginate-data.interface";
import { ServiceUsageType } from "../../../types/service-usage.type";
import { MyDoc } from "../../response/Doc";
import { Th } from "./th-styled";

interface RequestProps {}

const Request: FC<RequestProps> = () => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("-created_at");
  const [data, setData] = useState<ServiceUsageType[] | undefined>(undefined);
  const [total_number, setTotalNumber] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState({ show: false, message: "" });

  useLayoutEffect(() => {
    consumerRequestApis
      .getRequestList(page, sort, search)
      .then((res) => {
        setData(res.rows);
        setTotalNumber(res.count);
      })
      .catch((e: ApiError) => showModal(e.message));
  }, [page, sort]);

  const searchGetItems = () => {
    consumerRequestApis
      .getRequestList(page, sort, search)
      .then((res) => {
        setData(res.rows);
        setTotalNumber(res.count);
      })
      .catch((e: ApiError) => showModal(e.message));
  };

  const navigate = useNavigate();
  const showModal = (msg: string) => {
    setModal({ message: msg, show: true });
  };

  const hiddenModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
    navigate("/");
  };
  return (
    <div className="container p-[30px] mt-[50px]">
      <AlertModal
        title="오류"
        message={modal.message}
        open={modal.show}
        onClose={hiddenModal}
      />
      <div className="flex justify-between max-md:flex-col ">
        <h1 className="text-h2 font-bold">Request List</h1>
        <div className="flex items-center space-x-2.5 max-md:flex-col max-md:items-start max-md:space-x-0 max-md:space-y-2.5 max-md:mt-2.5">
          <div className="h-10 bg-gray100 px-5 rounded-full flex items-center space-x-[3px] max-md:w-full">
            <input
              className="bg-gray100 border-0 max-w-[86px] text-b2 max-md:w-full max-md:max-w-full"
              style={{ fontSize: "15px" }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색"
            />
            <button type="submit" onClick={() => searchGetItems()}>
              <img src={SearchIcon} alt="검색버튼" className="w-5 h-5" />
            </button>
          </div>
          <div className="max-md:w-full max-md:flex max-md:justify-end">
            <Select
              data={[
                { value: "created_at", label: "전체" },
                { value: "analysis", label: "분석중" },
                { value: "complete", label: "완료" },
                { value: "unused", label: "이용전" },
                { value: "resultAt", label: "응답일" },
              ]}
              setValue={setSort}
              value={sort}
              img={FilterButton}
              imgAlt="orderBy"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="mt-10 table-fixed relative w-full">
          <thead className="bg-black">
            <tr className="text-b3 font-semibold text-white">
              <Th className="w-[109px]">No.</Th>
              <Th className="w-[310px]">서비스명</Th>
              <Th className="w-[150px]">응답일</Th>
              <Th className="w-[150px]">분석완료일</Th>
              <Th className="w-[110px]">상태</Th>
              <Th className="w-[110px]">응답보기</Th>
              <Th className="w-[110px]">결과보기</Th>
              <Th className="w-[110px]">PDF 다운</Th>
            </tr>
          </thead>
          <tbody>
            {data?.length !== 0 ? (
              data?.map((value: ServiceUsageType, i: number) => {
                value.resultAt = moment
                  .tz(value.resultAt, "Asia/Seoul")
                  .format("YYYY.MM.DD");
                value.updatedAt = moment
                  .tz(value.updatedAt, "Asia/Seoul")
                  .format("YYYY.MM.DD");
                if (
                  value.status === "이용완료" &&
                  value.response !== null &&
                  value.result !== null
                ) {
                  value.status = "완료";
                } else if (
                  value.status === "이용전" &&
                  value.response === null &&
                  value.result === null
                ) {
                  value.resultAt = "-";
                  value.updatedAt = "-";
                  value.status = "이용전";
                } else if (
                  value.response === null &&
                  value.resultAt !== "" &&
                  value.result !== null
                ) {
                  value.updatedAt = "-";
                  value.status = "분석중";
                }
                return (
                  <tr
                    className="text-b3 font-normal border-b border-gray300"
                    key={i}
                  >
                    <td className="text-center py-[12px] px-[15px]">
                      {value.index}
                    </td>
                    <td className="py-[12px] px-[15px]">
                      <Link to={`/consumer/service/${value.service._id}`}>
                        {value.service.name}
                      </Link>
                    </td>
                    <td className="text-center py-[12px] px-[15px]">
                      {value.resultAt}
                    </td>
                    <td className="text-center py-[12px] px-[15px]">
                      {value.updatedAt}
                    </td>
                    <td className="text-center py-[12px] px-[15px]">
                      {value.status}
                    </td>
                    <td className="py-[12px] px-[35px]">
                      <Link
                        to={"/consumer/request/result"}
                        state={value._id}
                        className={classNames(
                          "w-10 h-10 rounded flex items-center justify-center",
                          {
                            "bg-gray100 pointer-events-none":
                              value.result === null,
                            "bg-blue500": value.result !== null,
                          }
                        )}
                      >
                        <img
                          src={value.result === null ? GrayWatch : WhiteWatch}
                          alt="응답보기"
                        />
                      </Link>
                    </td>
                    <td className="py-[12px] px-[35px]">
                      <button
                        disabled={value.response === null}
                        onClick={() =>
                          navigate("/common/responsereport", {
                            state: { _id: value._id },
                          })
                        }
                        className={classNames(
                          "w-10 h-10 rounded flex items-center justify-center",
                          {
                            "bg-gray100": value.response === null,
                            "bg-blue500": value.response !== null,
                          }
                        )}
                      >
                        <img
                          src={value.response === null ? GrayWatch : WhiteWatch}
                          alt="결과보기"
                        />
                      </button>
                    </td>
                    <td className="py-[12px] px-[35px]">
                      <button
                        disabled={value.response === null}
                        className={classNames(
                          "w-10 h-10 rounded flex items-center justify-center",
                          {
                            "bg-gray100": value.response === null,
                            "bg-blue500": value.response !== null,
                          }
                        )}
                      >
                        {data[i].response !== null ? (
                          <PDFDownloadLink
                            document={
                              <MyDoc
                                data={{
                                  response: data[i].response,
                                  thumbnail_content: data[i].thumbnail_content,
                                }}
                                response_title={data[i].response.title}
                              />
                            }
                            fileName={`${data[i].response.title}.pdf`}
                          >
                            <img src={WhiteDownload} alt="PDF 다운" />
                          </PDFDownloadLink>
                        ) : (
                          <img src={GrayDownload} alt="PDF 다운" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="border-b border-gray300 py-5 w-full"
                  colSpan={999}
                >
                  <h2 className="text-center font-bold">
                    서비스 사용에 대한 정보가 없습니다.
                  </h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Pagination
          currentPage={page}
          pageSize={10}
          totalNumber={total_number}
          containterClassName=""
          onChange={(next) => setPage(next)}
        />
      </div>
    </div>
  );
};

export default Request;
