import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useIsLogin } from "../../auth/hooks";
import { UserType } from "../../auth/type";
import { UserTypeFilter } from "./UserTypeFilter";

type UnAuthRouterProps = {
  shouldLogin: false;
  redirect?: string;
};
type AuthRouterProps = {
  shouldLogin: true;
  userType: UserType[];
  redirect?: string;
};

type AuthRouterFilterProps = UnAuthRouterProps | AuthRouterProps;

export const AuthRouterFilter: FC<AuthRouterFilterProps> = (props) => {
  const isLogin = useIsLogin();
  const { redirect = "/" } = props;

  if (props.shouldLogin !== true && isLogin === false) {
    return <Outlet />;
  }
  if (props.shouldLogin === true && isLogin === true) {
    return <UserTypeFilter userType={props.userType} redirect={redirect} />;
  }

  return <Navigate to={redirect} replace />;
};
