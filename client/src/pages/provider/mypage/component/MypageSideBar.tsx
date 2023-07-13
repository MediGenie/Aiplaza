import classNames from "classnames";
import { FC } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthValue } from "../../../../auth/hooks";
import { blueRightArrow, grayRightArrow } from "../../../../icons";

interface MypageSideBarProps {}

const MypageSideBar: FC<MypageSideBarProps> = () => {
  const { user } = useAuthValue();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  const myLocation = location.pathname.split("/").pop();
  return (
    <div className="flex flex-col lg:flex-row relative overflow-auto bg-gray50">
      <div className="lg:max-w-[390px] w-full bg-white border-b lg:border-r border-gray200 shadow-1 relative overflow-auto">
        <div className="py-5 px-10 space-x-2.5 flex border-b-4 border-gray100">
          <div>
            <button className="px-[10px] py-[5px] text-white text-b3 font-medium bg-blue500 rounded-[5px]">
              서비스 제공자
            </button>
            <h2 className="mt-2.5 text-b1 font-semibold">{user?.name}</h2>
            <p className="text-b3 text-gray600 whitespace-pre-line">
              {user?.email}
            </p>
          </div>
        </div>
        <div>
          <NavLink
            to="/provider/mypage/myinfo"
            className={({ isActive }) =>
              classNames(
                "flex px-10 py-3.5 text-b2 text-gray400 border-b border-b-gray100",
                {
                  "text-blue500 bg-gray50": isActive,
                }
              )
            }
          >
            <span className="mr-auto">계정관리</span>
            <div className="flex ml-auto">
              {myLocation === "myinfo" ? (
                <img src={blueRightArrow} alt="blueRightArrow" />
              ) : (
                <img src={grayRightArrow} alt="blueRightArrow" />
              )}
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/provider/mypage/service"
            className={({ isActive }) =>
              classNames(
                "flex px-10 py-3.5 text-b2 text-gray400 border-b border-b-gray100",
                {
                  "text-blue500 bg-gray50": isActive,
                }
              )
            }
          >
            <span className="mr-auto">서비스 내역</span>
            <div className="flex ml-auto">
              {myLocation === "service" ? (
                <img src={blueRightArrow} alt="blueRightArrow" />
              ) : (
                <img src={grayRightArrow} alt="blueRightArrow" />
              )}
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/provider/mypage/withdraw"
            className={({ isActive }) =>
              classNames(
                "flex px-10 py-3.5 text-b2 text-gray400 border-b border-b-gray100",
                {
                  "text-blue500 bg-gray50": isActive,
                }
              )
            }
          >
            <span className="mr-auto">정산내역</span>
            <div className="flex ml-auto">
              {myLocation === "withdraw" ? (
                <img src={blueRightArrow} alt="blueRightArrow" />
              ) : (
                <img src={grayRightArrow} alt="blueRightArrow" />
              )}
            </div>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

MypageSideBar.defaultProps = {} as Partial<MypageSideBarProps>;

export default MypageSideBar;
