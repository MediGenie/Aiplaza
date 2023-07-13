import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch, useUserType } from "../../auth/hooks";
import { UserType } from "../../auth/type";
import { Hambuger } from "../../icons";
import { ConsumerMenu } from "./ConsumerMenu";
import { ProviderMenu } from "./ProviderMenu";

interface UserMenuProps {}

export const UserMenu: FC<UserMenuProps> = () => {
  const dispatch = useAuthDispatch();
  const handleLogout = () => dispatch.logout();
  const type = useUserType();
  if (type === UserType.PROVIDER) {
    return (
      <div>
        <div className="max-sm:hidden">
          <ProviderMenu />
        </div>
        <div className="hidden max-sm:block">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="font-medium text-white text-b3 flex items-center">
                <img src={Hambuger} alt="햄버거 버튼" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white focus:outline-none"
                  style={{
                    boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
                  }}
                >
                  <div className="p-1">
                    <Menu.Item>
                      <Link
                        to="/provider/service"
                        state={{ method: "email", type: UserType.PROVIDER }}
                        className="p-2 text-b3 block"
                      >
                        서비스
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        to="/provider/mypage/myinfo"
                        state={{ method: "email", type: UserType.CONSUMER }}
                        className="p-2 text-b3 block"
                      >
                        마이페이지
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="p-2 text-b3 block"
                      >
                        로그아웃
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="max-sm:hidden">
        <ConsumerMenu />
      </div>
      <div className="hidden max-sm:block">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="font-medium text-white text-b3 flex items-center">
              <img src={Hambuger} alt="햄버거 버튼" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white focus:outline-none"
                style={{ boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)" }}
              >
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      to="/consumer/service"
                      state={{ method: "email", type: UserType.PROVIDER }}
                      className="p-2 text-b3 block"
                    >
                      서비스
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/consumer/request"
                      state={{ method: "email", type: UserType.CONSUMER }}
                      className="p-2 text-b3 block"
                    >
                      리퀘스트
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/consumer/mypage/myinfo"
                      state={{ method: "email", type: UserType.PROVIDER }}
                      className="p-2 text-b3 block"
                    >
                      마이페이지
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-b3 block"
                    >
                      로그아웃
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>
    </div>
  );
};
