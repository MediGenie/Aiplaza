import moment from "moment-timezone";
import { FC, useLayoutEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../apis/api-error";
import { boardApis } from "../apis/board";
import Pagination from "../components/Pagination/Pagination";
import { AlertModal } from "../modals";
import { BoardType } from "../types/board.types";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  const [data, setData] = useState<BoardType[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [total_number, setTotalNumber] = useState(0);
  const [modal, setModal] = useState({ show: false, message: "" });
  const navigate = useNavigate();
  const showModal = (msg: string) => {
    setModal({ message: msg, show: true });
  };

  const hiddenModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
    navigate("/");
  };

  useLayoutEffect(() => {
    boardApis
      .getBoard(page)
      .then((res) => {
        setData(res.rows);
        setTotalNumber(res.count);
      })
      .catch((e: ApiError) => showModal(e.message));
  }, [page]);

  return (
    <div>
      <AlertModal
        message={modal.message}
        open={modal.show}
        onClose={hiddenModal}
        title="알림"
      />
      <div className="container">
        <div className="py-20 px-[10px]">
          <div className="flex flex-col justify-center">
            <h1 className="text-h2 font-bold">공지사항</h1>
            <div className=" overflow-x-auto">
              <table className="mt-10 relative w-full table-fixed">
                <thead className="bg-black">
                  <tr className="text-b3 font-semibold text-white ">
                    <th className="w-[150px] py-[12px] px-[15px]">No.</th>
                    <th className="w-[800px] py-[12px] px-[15px]">제목</th>
                    <th className="w-[210px] py-[12px] px-[15px]">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {data !== undefined ? (
                    data.map((value: BoardType, index: number) => {
                      const mo = moment
                        .tz(value.created_at, "Asia/Seoul")
                        .format("YYYY.MM.DD");
                      return (
                        <tr
                          className="text-b3 font-normal border-b border-gray300"
                          key={index}
                        >
                          <td className="text-center py-[12px] px-[15px]">
                            {value.index}
                          </td>
                          <td className="py-[12px] px-[15px]">
                            <Link to={`/board-detail`} state={value._id}>
                              {value.title}
                            </Link>
                          </td>
                          <td className="text-center py-[12px] px-[15px]">
                            {mo}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <></>
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
      </div>
    </div>
  );
};

export default Board;
