import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthDispatch } from "../../auth/hooks";
import classNames from "classnames";

interface ConsumerMenuProps {}

export const ConsumerMenu: FC<ConsumerMenuProps> = () => {
  const dispatch = useAuthDispatch();
  const handleLogout = () => dispatch.logout();
  const location = useLocation();
  const [currentClick, setCurrentClick] = useState("");

  useEffect(() => {
    let v = "";
    if (location.pathname.indexOf("service") !== -1) {
      v = "service";
    } else if (location.pathname.indexOf("request") !== -1) {
      v = "request";
    } else if (location.pathname.indexOf("mypage") !== -1) {
      v = "mypage";
    }
    setCurrentClick(v);
  }, [location.pathname]);

  const getClick = (e?: any) => {
    if (e) {
      setCurrentClick(e.target.id);
    }
  };
  return (
    <div className="space-x-10 flex items-center">
      <Link
        id="service"
        className={classNames("text-b3", {
          "text-gray400": currentClick !== "service",
          "text-white": currentClick === "service",
        })}
        to="/consumer/service"
        onClick={(e) => getClick(e)}
      >
        서비스
      </Link>
      <Link
        id="request"
        className={classNames("text-b3", {
          "text-gray400": currentClick !== "request",
          "text-white": currentClick === "request",
        })}
        to="/consumer/request"
        onClick={(e) => getClick(e)}
      >
        리퀘스트
      </Link>
      <Link
        id="mypage"
        className={classNames("text-b3", {
          "text-gray400": currentClick !== "mypage",
          "text-white": currentClick === "mypage",
        })}
        to="/consumer/mypage/myinfo"
        onClick={(e) => getClick(e)}
      >
        마이페이지
      </Link>
      <button
        className="text-gray400 text-b3"
        type="button"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};
