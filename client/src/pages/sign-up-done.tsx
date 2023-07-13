import { FC, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserType } from '../auth/type';
import '../components/Button/style.css';
import { useRouteState } from '../hooks/useRouteState';
import { LogoBlue } from '../icons';

interface SignUpDoneProps {}

type RouteState = {
  type: UserType;
};
const SignUpDone: FC<SignUpDoneProps> = () => {
  const routeState = useRouteState<RouteState>();

  const welcome_sentence = useMemo(() => {
    if (routeState.type === UserType.CONSUMER) {
      return '설문을 응답해 보세요.';
    } else if (routeState.type === UserType.PROVIDER) {
      return '설문을 제작해 보세요.';
    }
    return '서비스를 이용해 주세요.';
  }, [routeState.type]);

  if (!routeState) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="py-20">
      <div
        className="mx-auto p-10 rounded"
        style={{
          maxWidth: 408,
          boxShadow: '0px 5px 18px 2px rgba(72, 72, 74, 0.1)',
        }}
      >
        <img
          src={LogoBlue}
          style={{ width: 120 }}
          className="mx-auto mb-5"
          alt=""
        />
        <h1 className="text-h2 font-bold text-center">회원가입 완료</h1>
        <p className="text-gray800 text-b3 text-center">
          AI Plaza에 오신 걸 환영합니다.
        </p>
        <p className="text-gray800 text-b3 text-center mb-10">
          {welcome_sentence}
        </p>
        <Link to="/sign-in" className="btn block w-full">
          로그인 하기
        </Link>
      </div>
    </div>
  );
};

export default SignUpDone;
