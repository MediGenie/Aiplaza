import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthDispatch } from "../../auth/hooks";
import classNames from "classnames";

interface ProviderMenuProps {}

export const ProviderMenu: FC<ProviderMenuProps> = () => {
  const dispatch = useAuthDispatch();
  const handleLogout = () => dispatch.logout();
  const location = useLocation();
  const [currentClick, setCurrentClick] = useState("");

  useEffect(() => {
    let v = "";
    if (location.pathname.indexOf("service") !== -1) {
      v = "service";
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
        to="/provider/service"
        onClick={(e) => getClick(e)}
      >
        서비스
      </Link>
      <Link
        id="mypage"
        className={classNames("text-b3", {
          "text-gray400": currentClick !== "mypage",
          "text-white": currentClick === "mypage",
        })}
        to="/provider/mypage/myinfo"
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
