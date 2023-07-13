import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../auth/type";

interface UnauthoriedMenuProps {}

export const UnauthoriedMenu: FC<UnauthoriedMenuProps> = () => {
  return (
    <nav className="flex items-center space-x-10 max-sm:space-x-2.5">
      <div>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="font-medium text-white text-b3">
              회원가입
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
                      to="/sign-up"
                      state={{ method: "email", type: UserType.PROVIDER }}
                      className="p-2 text-b3 block"
                    >
                      서비스 제공자
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/sign-up"
                      state={{ method: "email", type: UserType.CONSUMER }}
                      className="p-2 text-b3 block"
                    >
                      일반회원
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>
      <Link to="/sign-in" className="bg-blue500 px-4 py-2 rounded">
        <span className="text-white text-b3">로그인</span>
      </Link>
    </nav>
  );
};
