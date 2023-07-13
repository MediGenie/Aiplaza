import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../../apis/api-error";
import { consumerRequestApis } from "../../../../apis/request";
import { LoadingIndicator } from "../../../../components/LoadingIndicator/LoadingIndicator";
import { useHideFooter } from "../../../../hooks/useHideFooter";
import { useRouteState } from "../../../../hooks/useRouteState";
import { AlertModal } from "../../../../modals";
import { ServiceRequestResultType } from "../../../../types/service-request-result.type";

import { Header } from "../component/header";
import { SectionViewer } from "../component/SectionViewer";
import { SideBar } from "../component/SideBar";

interface RouteState {
  _id: any;
}

interface ConsumerResultProps {
  data: ServiceRequestResultType;
}

const ConsumerResultCore: FC<ConsumerResultProps> = ({ data }) => {
  return (
    <div
      className="flex relative overflow-auto bg-gray50 max-lg:flex-col"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div>
        <SideBar
          title={data.thumbnail_content.title}
          description={data.thumbnail_content.description}
          thumbnail={data.thumbnail_content.thumbnail.url}
        />
      </div>
      <div className="flex-1 h-full overflow-auto relative">
        <Header title={data.thumbnail_content.title} />
        <div className="relative" style={{ height: "calc(100% - 65px)" }}>
          <div className="container-sm mt-10 space-y-5">
            {data.result_form.map((value, index) => {
              return (
                <SectionViewer
                  index={index}
                  form_value={value}
                  user_response_value={data.result}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ConsumerResult: FC = () => {
  const routeState = useRouteState<RouteState>();

  const [data, setData] = useState<ServiceRequestResultType | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useLayoutEffect(() => {
    consumerRequestApis
      .getRequestResult(routeState)
      .then((res) => setData(res))
      .catch((e: ApiError) => setError(e.message));
  }, []);

  useHideFooter();

  if (data === undefined) {
    return (
      <div className="bg-gray50 py-20">
        <AlertModal
          open={typeof error === "string"}
          title="알림"
          message={error}
          onClose={() => {
            navigate("/consumer/service/request");
          }}
        />
        <LoadingIndicator />
      </div>
    );
  }
  return <ConsumerResultCore data={data} />;
};

export default ConsumerResult;
