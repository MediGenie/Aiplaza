import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { UserType } from "../auth/type";
import { AuthRouterFilter } from "../components/AuthRouterFilter/AuthRouterFilter";
import { LoadingIndicator } from "../components/LoadingIndicator/LoadingIndicator";
import FindPwDone from "./find-pw-done";
import { PageEdit } from "./page-edit";
import ServiceProviderResult from "./provider/service/[id]/result";
import ResponseReporter from "./response/response";

import { RootRouter } from "./RootRouter";
import { Test } from "./test";
interface PageProps {}

const Home = lazy(() => import("./home"));
const SignIn = lazy(() => import("./sign-in"));
const SignUp = lazy(() => import("./sign-up"));
const SignUpDone = lazy(() => import("./sign-up-done"));
const ServiceCreatePage = lazy(() => import("./provider/service/create"));
const FormEdit = lazy(() => import("./form-edit"));
const ServiceDetail = lazy(() => import("./consumer/service/[id]"));
const ServiceProviderDetail = lazy(() => import("./provider/service/[id]"));
const ServiceEditPage = lazy(() => import("./provider/service/[id]/edit"));
const ServiceUsagePage = lazy(() => import("./consumer/service/[id]/usage"));
const ServiceWaiting = lazy(() => import("./consumer/service/waiting"));
const FindPW = lazy(() => import("./find-pw"));
const ConsumerMypageSideBar = lazy(
  () => import("./consumer/mypage/component/MypageSideBar")
);
const ConsumerMyInfo = lazy(() => import("./consumer/mypage/my-info"));
const ProviderMypageSideBar = lazy(
  () => import("./provider/mypage/component/MypageSideBar")
);
const ProviderMyInfo = lazy(() => import("./provider/mypage/my-info"));
const ProviderMyService = lazy(() => import("./provider/mypage/my-service"));
const ProviderMyWithDraw = lazy(() => import("./provider/mypage/my-withdraw"));
const ProviderService = lazy(() => import("./provider/service"));
const ConsumerPayment = lazy(() => import("./consumer/mypage/payment"));
const ConsumerService = lazy(() => import("./consumer/service/index"));
const ConsumerRequest = lazy(() => import("./consumer/request/index"));
const ConsumerResult = lazy(() => import("./consumer/request/result/result"));
const Board = lazy(() => import("./board"));
const BoardDetail = lazy(() => import("./board-detail"));

export const Page: FC<PageProps> = () => {
  return (
    <Suspense
      fallback={
        <div className="py-20">
          <LoadingIndicator />
        </div>
      }
    >
      <Routes>
        <Route element={<RootRouter />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthRouterFilter shouldLogin={false} />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up/done" element={<SignUpDone />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/find-pw" element={<FindPW />} />
          <Route path="/find-pw/done" element={<FindPwDone />} />
        </Route>
        <Route
          path="/provider"
          element={
            <AuthRouterFilter shouldLogin userType={[UserType.PROVIDER]} />
          }
        >
          <Route path="/provider/service" element={<ProviderService />} />
          <Route path="/provider/mypage" element={<ProviderMypageSideBar />}>
            <Route
              path="/provider/mypage/myinfo"
              element={<ProviderMyInfo />}
            />
            <Route
              path="/provider/mypage/service"
              element={<ProviderMyService />}
            />
            <Route
              path="/provider/mypage/withdraw"
              element={<ProviderMyWithDraw />}
            />
          </Route>
          <Route
            path="/provider/service/create"
            element={<ServiceCreatePage />}
          />
          <Route
            path="/provider/service/:id"
            element={<ServiceProviderDetail />}
          />
          <Route
            path="/provider/service/:id/edit"
            element={<ServiceEditPage />}
          />
          <Route
            path="/provider/service/:id/result"
            element={<ServiceProviderResult />}
          />
        </Route>
        <Route
          element={
            <AuthRouterFilter shouldLogin userType={[UserType.CONSUMER]} />
          }
        >
          <Route path="/consumer/service" element={<ConsumerService />} />
          <Route path="/consumer/request" element={<ConsumerRequest />} />
          <Route path="/consumer/mypage" element={<ConsumerMypageSideBar />}>
            <Route
              path="/consumer/mypage/myinfo"
              element={<ConsumerMyInfo />}
            />
            <Route
              path="/consumer/mypage/payment"
              element={<ConsumerPayment />}
            />
          </Route>
          <Route
            path="/consumer/service/waiting"
            element={<ServiceWaiting />}
          />
          <Route path="/consumer/service/:id" element={<ServiceDetail />} />
          <Route
            path="/consumer/service/:id/usage"
            element={<ServiceUsagePage />}
          />
        </Route>
        <Route
          path="/common"
          element={
            <AuthRouterFilter
              shouldLogin
              userType={[UserType.CONSUMER, UserType.PROVIDER]}
            />
          }
        >
          <Route path="/common/responsereport" element={<ResponseReporter />} />
        </Route>
        <Route path="/board" element={<Board />} />
        <Route path="/board-detail" element={<BoardDetail />} />
        <Route path="/test" element={<Test />} />
        <Route path="/page-edit" element={<PageEdit />} />
        <Route path="/form-edit" element={<FormEdit />} />
        <Route path="/consumer/request/result" element={<ConsumerResult />} />
      </Routes>
    </Suspense>
  );
};
