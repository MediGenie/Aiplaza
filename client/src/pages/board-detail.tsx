import moment from "moment-timezone";
import { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { boardApis } from "../apis/board";
import { ArrowBlackIcon } from "../assets";
import { useRouteState } from "../hooks/useRouteState";
import { BoardType } from "../types/board.types";

interface RouteState {
  _id: string;
}

interface BoardDetailProps {}

const BoardDetail: FC<BoardDetailProps> = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  const routeState = useRouteState<RouteState>();
  const [data, setData] = useState<BoardType | undefined>(undefined);

  useLayoutEffect(() => {
    boardApis.getOneBoard(routeState).then((res) => {
      setData(res);
      setDate(moment.tz(res.created_at, "Asia/Seoul").format("YYYY.MM.DD"));
    });
  }, []);

  return (
    <div className="bg-[#FBFBFD] pb-[230px]">
      <div className="bg-white w-full border-b border-[#E5E5ea] flex items-center justify-center py-5">
        <div className="px-[46px] w-full flex items-center justify-between">
          <div onClick={() => navigate(-1)} className=" cursor-pointer">
            <img src={ArrowBlackIcon} alt="" />
          </div>
          <h2 className="text-b3" style={{ fontWeight: 500 }}>
            공지사항
          </h2>
          <h2 className="text-white">{""}</h2>
        </div>
      </div>
      <div
        className="mt-20 container-sm border border-gray100 bg-white rounded"
        style={{ maxWidth: 730 }}
      >
        {data !== undefined ? (
          <div className="p-10">
            <h1 className="text-b1 font-semibold">{data.title}</h1>
            <div className="border-b border-gray400 pb-5 pt-2.5">
              <p className="text-b2 text-gray400">{date}</p>
            </div>
            <div className="mt-5 flex items-center justify-center">
              {data?.image !== undefined ? (
                <img src={data?.image?.url} alt={data?.image?.name} />
              ) : (
                <></>
              )}
            </div>
            <p
              className="mt-5 font-[#1C1C1E] w-full h-full text-b2 whitespace-pre-wrap"
              style={{ fontSize: 15 }}
            >
              {data.content}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
