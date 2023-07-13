import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FindPwUnLock } from "../assets";
import { Button } from "../components/Button";
import { useRouteState } from "../hooks/useRouteState";

interface FindPwDoneProps {}
interface RouteState {
  email: string;
}

const FindPwDone: FC<FindPwDoneProps> = () => {
  const routeState = useRouteState<RouteState>();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/sign-in");
  };

  if (routeState?.email === undefined) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="py-20" style={{ minHeight: 792 }}>
      <div className="container">
        <div
          className="mx-auto rounded bg-white p-10"
          style={{
            boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
            maxWidth: 408,
          }}
        >
          <img
            src={FindPwUnLock}
            style={{ width: 120, height: 120 }}
            alt="비밀번호 찾기"
            className="mx-auto mb-5"
          />
          <div className="mb-10">
            <h1 className="mb-2.5 font-bold text-h2 text-center">
              비밀번호 찾기 성공
            </h1>
            <p className="text-b3 text-gray800 text-center">
              {routeState.email}으로
            </p>
            <p className="text-b3 text-gray800 text-center">
              임시비밀번호가 발송되었습니다.
            </p>
          </div>
          <Button className="w-full block" onClick={goToLogin}>
            로그인 하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindPwDone;
