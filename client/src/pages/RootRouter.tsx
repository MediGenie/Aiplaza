import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useIsLogin, useUserType } from "../auth/hooks";
import { UserType } from "../auth/type";

interface RootRouterProps {}

const RootNavigate: FC = () => {
  const type = useUserType();
  if (type === UserType.PROVIDER) {
    return <Navigate to="/provider/service" replace />;
  }
  return <Navigate to="/consumer/service" replace />;
};

export const RootRouter: FC<RootRouterProps> = () => {
  const isLogin = useIsLogin();
  if (isLogin === false) {
    return <Outlet />;
  }
  return <RootNavigate />;
};
