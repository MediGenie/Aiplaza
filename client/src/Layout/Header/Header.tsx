import { FC } from "react";
import { Link } from "react-router-dom";
import { useIsLogin } from "../../auth/hooks";
import { LogoWhite } from "../../icons";
import "./style.css";
import { UserMenu } from "./UserMenu";
import { UnauthoriedMenu } from "./UnauthoriedMenu";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const isLogin = useIsLogin();
  const Component = isLogin ? UserMenu : UnauthoriedMenu;
  return (
    <div className="header-container">
      <div
        className="h-full flex justify-between items-center px-10 max-sm:px-5"
        style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        <Link to="/" className="block">
          <img src={LogoWhite} alt="asd" />
        </Link>
        <Component />
      </div>
    </div>
  );
};
