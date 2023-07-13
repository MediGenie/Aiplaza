import { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../apis/api-error";
import { AllUserRequestApis } from "../../apis/request";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { useHideFooter } from "../../hooks/useHideFooter";
import { useRouteState } from "../../hooks/useRouteState";
import { AlertModal } from "../../modals";
import { ServiceRequestResponseType } from "../../types/service-response.type";
import { SideBar } from "../consumer/request/component/SideBar";
import { Header } from "./Header";

interface RouteState {
  _id: any;
}

interface ResponseReporterProps {
  data: ServiceRequestResponseType;
}

const ResponseReporterCore: FC<ResponseReporterProps> = ({ data }) => {
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
        <Header
          data={data}
          title={data.thumbnail_content.title}
          response_title={data.response.title}
        />
        <div className="relative" style={{ height: "calc(100% - 65px)" }}>
          <div className="container-sm mt-10">
            <div className="space-y-10">
              {data.response.paragraph.map((value, index) => {
                return (
                  <div
                    className="bg-white p-10 space-y-2.5 rounded"
                    key={index}
                  >
                    <div>
                      <h1 className="font-semibold text-b1">
                        {value.subtitle}
                      </h1>
                      {value.header !== undefined ? (
                        <p
                          className=" text-gray600 mt-[5px]"
                          style={{ fontSize: "14px", lineHeight: "22px" }}
                        >
                          {value.header}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {value.medeia !== undefined ? (
                        <img
                          className="rounded-lg w-full"
                          src={value.medeia}
                          alt={value.medeia}
                        />
                      ) : (
                        <></>
                      )}
                      {value.media !== undefined ? (
                        <img
                          className="rounded-lg w-full"
                          src={value.media}
                          alt={value.media}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <p className="text-b2 font-medium text-gray800">
                      {value.notes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResponseReporter: FC = () => {
  const routeState = useRouteState<RouteState>();

  const [data, setData] = useState<ServiceRequestResponseType | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useLayoutEffect(() => {
    AllUserRequestApis.getRequestResponse(routeState)
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
  return <ResponseReporterCore data={data} />;
};

export default ResponseReporter;
