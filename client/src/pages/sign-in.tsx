import classNames from "classnames";
import { error } from "console";
import { Form, FormikProvider, useFormik } from "formik";
import { FC, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ApiError } from "../apis/api-error";
import { useAuthDispatch } from "../auth/hooks";
import { UserType } from "../auth/type";
import { Button } from "../components/Button";
import { CheckBox } from "../components/CheckBox";
import { FormikInputBox } from "../components/FormikComponent";
import { useSocialLogin } from "../hooks/useSocialLogin";
import {
  AppleSignInIcon,
  blueRightArrow,
  GoogleSignInIcon,
  LoginTypeSelectIcon,
  NaverSignInIcon,
} from "../icons";
import { AlertModal } from "../modals";
import { SocialType } from "../types/social.type";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const location = useLocation();
  const [isPersist, setIsPersist] = useState(false);
  const [selectType, setSelectType] = useState<UserType>(
    location?.state?.userType || UserType.PROVIDER
  );
  const authdispatch = useAuthDispatch();
  const [modal, setModal] = useState({ show: false, message: "" });
  const showModal = (msg: string) => {
    setModal({ show: true, message: msg });
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      authdispatch
        .login(values.username, values.password, selectType, isPersist)
        .catch((e) => {
          if (e.message === "Unauthorized") {
            showModal("비밀번호와 아이디를 올바르게 입력해주세요");
          } else {
            showModal(e.message);
          }
        });
    },
  });

  const handleGetSocialData = useCallback(
    (opts: {
      id: string;
      type: SocialType;
      account_type: "provider" | "consumer";
      email?: string;
    }) => {
      return authdispatch
        .socialLogin(
          opts.id,
          opts.type,
          opts.account_type,
          isPersist,
          opts?.email
        )
        .catch((e: ApiError) => {
          if (e.type === "redirect") {
            navigate("/sign-up", {
              state: {
                method: opts.type,
                type:
                  opts.account_type === "provider"
                    ? UserType.PROVIDER
                    : UserType.CONSUMER,
                social_key: opts.id,
                email: opts.email,
              },
            });
          } else {
            console.log(e.message);
            showModal(e.message);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authdispatch, isPersist]
  );

  const { socialPopupOpen } = useSocialLogin(handleGetSocialData);
  const handleGoogleSignIn = () => {
    socialPopupOpen(selectType, "google");
  };

  const handleNaverSignIn = () => {
    console.log(selectType);
    socialPopupOpen(selectType, "naver");
  };

  const handleAppleSignIn = () => {
    socialPopupOpen(selectType, "apple");
  };

  return (
    <div className="py-20 bg-white">
      <AlertModal
        open={modal.show}
        message={modal.message}
        title="알림"
        onClose={hideModal}
      />
      <div className="container">
        <div
          className="bg-white rounded w-full mx-auto"
          style={{
            maxWidth: 408,
            boxShadow: "0px 5px 18px 2px rgba(72, 72, 74, 0.1)",
          }}
        >
          <div className="flex">
            <button
              className={classNames("flex-1 p-[14px] rounded-tl relative", {
                "bg-gray800": selectType === UserType.PROVIDER,
                "bg-gray50": selectType !== UserType.PROVIDER,
              })}
              onClick={() => {
                setSelectType(UserType.PROVIDER);
              }}
              type="button"
            >
              <span
                className={classNames("font-medium text-b3", {
                  "text-white": selectType === UserType.PROVIDER,
                  "text-gray400": selectType !== UserType.PROVIDER,
                })}
              >
                서비스제공자
              </span>
              {selectType === UserType.PROVIDER && (
                <img
                  src={LoginTypeSelectIcon}
                  alt=""
                  className="w-2.5 h-2 absolute -bottom-[1px] left-1/2 -translate-x-1/2"
                />
              )}
            </button>
            <button
              className={classNames("flex-1 p-[14px] rounded-tr relative", {
                "bg-gray800": selectType === UserType.CONSUMER,
                "bg-gray50": selectType !== UserType.CONSUMER,
              })}
              onClick={() => {
                setSelectType(UserType.CONSUMER);
              }}
              type="button"
            >
              <span
                className={classNames("font-medium text-b3", {
                  "text-white": selectType === UserType.CONSUMER,
                  "text-gray400": selectType !== UserType.CONSUMER,
                })}
              >
                일반회원
              </span>
              {selectType === UserType.CONSUMER && (
                <img
                  src={LoginTypeSelectIcon}
                  alt=""
                  className="w-2.5 h-2 absolute -bottom-[1px] left-1/2 -translate-x-1/2"
                />
              )}
            </button>
          </div>
          <div className="p-10">
            <FormikProvider value={formik}>
              <Form>
                <h2 className="text-h2 font-bold text-center">로그인</h2>
                <div className="mt-10 space-y-2.5">
                  <FormikInputBox
                    name="username"
                    className="w-full block"
                    placeholder="아이디(이메일)을 입력해 주세요."
                  />
                  <FormikInputBox
                    name="password"
                    className="w-full block"
                    placeholder="비밀번호를 입력해 주세요."
                    secure
                  />
                </div>
                <Button type="submit" className="mt-5 w-full block">
                  로그인
                </Button>
              </Form>
            </FormikProvider>
            <div className="mt-2.5 flex justify-between">
              <div className="flex items-center space-x-2.5">
                <CheckBox value={isPersist} onChange={setIsPersist} />
                <span className="text-gray800 text-b3">로그인 유지하기</span>
              </div>
              <Link
                to="/find-pw"
                state={{ type: selectType }}
                className="text-b3 text-gray800"
              >
                비밀번호 찾기
              </Link>
            </div>
            <div className="mt-20 pb-10 border-b border-gray200">
              <p className="text-b3 text-gray400 text-center">
                SNS 계정으로 로그인
              </p>
              <div className="mt-5 flex items-center justify-center space-x-5">
                <button
                  className="w-15 h-15"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src={GoogleSignInIcon}
                    alt="구글 로그인"
                    className="w-full h-full"
                  />
                </button>
                <button
                  className="w-15 h-15"
                  type="button"
                  onClick={handleNaverSignIn}
                >
                  <img
                    src={NaverSignInIcon}
                    alt="네이버 로그인"
                    className="w-full h-full"
                  />
                </button>
                <button
                  className="w-15 h-15"
                  type="button"
                  onClick={handleAppleSignIn}
                >
                  <img
                    src={AppleSignInIcon}
                    alt="애플 로그인"
                    className="w-full h-full"
                  />
                </button>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link
                className="inline-flex justify-center items-center"
                to="/sign-up"
                state={{
                  method: "email",
                  type: selectType,
                }}
              >
                <p className="text-center text-b2 text-blue500 font-medium">
                  회원가입
                </p>
                <img
                  src={blueRightArrow}
                  className="block w-4 h-4"
                  alt="회원가입"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
