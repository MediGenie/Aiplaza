import { FC, useEffect, useState } from "react";
import { ApiError } from "../../../apis/api-error";
import { mypageApis } from "../../../apis/mypage";
import Pagination from "../../../components/Pagination/Pagination";
import WithDrawalListTable from "./component/WithDrawalListTable";
import { useGetWithDrawList } from "./hooks/useGetWithDrawList";

interface MyWithDrawType {}

const MyWithDraw: FC<MyWithDrawType> = () => {
  const {
    page,
    page_size,
    rows,
    setPage,
    totalRevenue,
    totalWithdrawal,
    totalBalance,
    total_number,
  } = useGetWithDrawList();

  const [modal, setModal] = useState({ show: false, message: "" });
  const [fetching, setFetching] = useState(false);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setFetching(true);
      if (rows.length % page_size === 0) {
        setPage(page + 1);
      }
      setFetching(false);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="container-sm w-full lg:min-h-[932px] py-20 space-y-10">
      <div className="flex lg:flex-row place-content-around lg:mb-10 py-[10px] lg:py-10 lg:h-[162px] border border-gray200 shadow-1">
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {totalRevenue.toLocaleString("ko-KR")}
          </p>
          <div className="mt-2.5 text-gray800">총 수익</div>
        </div>
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {totalWithdrawal.toLocaleString("ko-KR")}
          </p>
          <div className="mt-2.5 text-gray800">인출액</div>
        </div>
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {totalBalance.toLocaleString("ko-KR")}
          </p>
          <div className="mt-2.5 text-gray800">잔액</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <WithDrawalListTable data={rows} />
      </div>
      {/* <div className="flex justify-center mb-20">
        <Pagination
          currentPage={page}
          pageSize={page_size}
          totalNumber={total_number}
          containterClassName=""
          onChange={(next) => setPage(next)}
        />
      </div> */}
    </div>
  );
};

export default MyWithDraw;
