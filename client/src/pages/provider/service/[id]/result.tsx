import { FC, useLayoutEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import classNames from "classnames";
import moment from "moment-timezone";
import { ApiError } from "../../../../apis/api-error";
import { providerServiceApis } from "../../../../apis/service";
import { ArrowBlackIcon, FilterButton, SearchIcon } from "../../../../assets";
import Pagination from "../../../../components/Pagination/Pagination";
import { Select } from "../../../../components/SelectButton/Select";
import {
  download,
  GrayDownload,
  GrayWatch,
  WhiteDownload,
  WhiteWatch,
} from "../../../../icons";
import { ServiceUsageType } from "../../../../types/service-usage.type";
import { Th } from "../../../consumer/request/th-styled";
import { MyDoc } from "../../../response/Doc";
import { AlertModal } from "../../../../modals";
import { LoadingIndicator } from "../../../../components/LoadingIndicator/LoadingIndicator";

interface ServiceProviderResultType {
  page: number;
  headerName: string;
  setSearch: (next: string) => void;
  searchGetItems: () => void;
  setPage: (next: number) => void;
  sort: string;
  setSort: (next: string) => void;
  total_number: number;
  data?: ServiceUsageType[];
}

const ServiceProviderResultCore: FC<ServiceProviderResultType> = ({
  page,
  headerName,
  setSearch,
  searchGetItems,
  setPage,
  sort,
  setSort,
  total_number,
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white w-full border-b border-[#E5E5ea] flex items-center justify-center py-5">
        <div className="px-[46px] w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div onClick={() => navigate(-1)} className=" cursor-pointer">
              <img src={ArrowBlackIcon} alt="" />
            </div>
            <h2 className="text-b1 font-bold">{headerName}</h2>
          </div>

          <h2 className="text-white">{""}</h2>
        </div>
        <h2
          className="absolute text-b3 text-center"
          style={{ fontWeight: 500 }}
        >
          결과
        </h2>
      </div>
      <div className="container p-[30px] mt-[50px]">
        <div className="flex justify-between max-md:flex-col ">
          <h1 className="text-h2 font-bold">{headerName}</h1>
          <div className="flex items-center space-x-2.5 max-md:flex-col max-md:items-start max-md:space-x-0 max-md:space-y-2.5 max-md:mt-2.5">
            <div className="h-10 bg-gray100 px-5 rounded-full flex items-center space-x-[3px] max-md:w-full">
              <input
                className="bg-gray100 border-0 max-w-[86px] text-b2 max-md:w-full max-md:max-w-full"
                style={{ fontSize: "15px" }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색"
              />
              <button type="submit" onClick={searchGetItems}>
                <img src={SearchIcon} alt="검색버튼" className="w-5 h-5" />
              </button>
            </div>
            <div className="max-md:w-full max-md:flex max-md:justify-end">
              <Select
                data={[
                  { value: "created_at", label: "전체" },
                  { value: "analysis", label: "분석중" },
                  { value: "complete", label: "완료" },
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
                <Th className="w-[310px]">이용자</Th>
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
                        {value.buyer.email}
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
                            src={
                              value.response === null ? GrayWatch : WhiteWatch
                            }
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
                                    thumbnail_content:
                                      data[i].thumbnail_content,
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
                      결과에 대한 정보가 없습니다.
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
    </div>
  );
};

const ServiceProviderResult: FC = () => {
  const params = useParams<"id">();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ServiceUsageType[] | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("-created_at");
  const [headerName, setHeaderName] = useState("");
  const [total_number, setTotalNumber] = useState(0);
  const [search, setSearch] = useState<string>("");

  useLayoutEffect(() => {
    let mounted = true;
    if (params.id) {
      providerServiceApis
        .getProviderServiceResultList(params.id, page, sort, search)
        .then((res) => {
          if (mounted) {
            setData(res.rows);
            setTotalNumber(res.total_number);
            setHeaderName(res.service_name);
          }
        })
        .catch((e: ApiError) => setError(e.message));
    } else {
      setError("id 값이 존재하지 않습니다.");
    }
    return () => {
      mounted = false;
    };
  }, [page, sort, params.id, headerName]);

  const searchGetItems = () => {
    providerServiceApis
      .getProviderServiceResultList(params.id, page, sort, search)
      .then((res) => {
        setData(res.rows);
        setTotalNumber(res.total_number);
        setHeaderName(res.service_name);
      })
      .catch((e: ApiError) => setError(e.message));
  };

  const navigate = useNavigate();
  if (typeof params.id === "undefined") {
    return <Navigate to="/404" replace />;
  }
  if (data === undefined) {
    return (
      <div className="bg-gray50 py-20">
        <AlertModal
          open={typeof error === "string"}
          title="알림"
          message={error}
          onClose={() => {
            navigate("/provider/service");
          }}
        />
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <ServiceProviderResultCore
      page={page}
      headerName={headerName}
      setSearch={setSearch}
      searchGetItems={searchGetItems}
      setPage={setPage}
      sort={sort}
      setSort={setSort}
      total_number={total_number}
      data={data}
    />
  );
};

export default ServiceProviderResult;
