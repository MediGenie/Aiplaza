import { FC, useState, useLayoutEffect, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ApiError } from "../../../../apis/api-error";
import { providerServiceApis } from "../../../../apis/service";
import { LoadingIndicator } from "../../../../components/LoadingIndicator/LoadingIndicator";
import { PageEditor } from "../../../../components/PageEditor";
import { templateIdEnum } from "../../../../components/PageEditor/enum/template-id";
import { ServiceFormEditor } from "../../../../components/ServiceFormEditor";
import { useHideFooter } from "../../../../hooks/useHideFooter";
import { template01DefaultValue } from "../../../../lib/template-1-default-value";
import { template02DefaultValue } from "../../../../lib/template-2-default-value";
import { template03DefaultValue } from "../../../../lib/template-3-default-value";
import { AlertModal } from "../../../../modals";
import { Header } from "./components/Header";
import { ServiceContentEdit } from "./components/ServiceContentEdit";
import { ServiceFileUpload } from "./components/ServiceFileUpload";
import { SideBar } from "./components/SideBar";
import { ServiceEditContext } from "./context/service-edit.context";
import { EditServiceType } from "./types/service-create.types";

interface ServiceEditProps {
  initial_value: EditServiceType;
}

function objectCopy<T>(obj: any): T {
  const text = JSON.stringify(obj);

  return JSON.parse(text);
}

const ServiceEditCore: FC<ServiceEditProps> = ({ initial_value }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState(initial_value);

  const onChangeStep = useCallback((next: number) => {
    setCurrentStep(next);
  }, []);
  const onChangeData = useCallback((next: Partial<EditServiceType>) => {
    setState((prev) => ({ ...prev, ...next }));
  }, []);
  const handleTemplate = useCallback((id: templateIdEnum) => {
    if (id === templateIdEnum.TEMPLATE_1) {
      setState((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template01DefaultValue),
        },
      }));
    }
    if (id === templateIdEnum.TEMPLATE_2) {
      setState((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template02DefaultValue),
        },
      }));
    }
    if (id === templateIdEnum.TEMPLATE_3) {
      setState((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template03DefaultValue),
        },
      }));
    }
  }, []);

  return (
    <ServiceEditContext.Provider
      value={{
        data: state,
        onChangeData,
        onChangeStep,
        step: currentStep,
      }}
    >
      <div
        className="flex relative overflow-auto bg-gray50 max-xl:flex-col "
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SideBar />
        <div className="flex-1 h-full overflow-auto relative">
          <Header />
          <div className="relative" style={{ height: "calc(100% - 65px)" }}>
            {currentStep === 1 && <ServiceContentEdit />}
            {currentStep === 2 && (
              <PageEditor
                value={state.page.data}
                onChange={(next) =>
                  setState((prev) => ({
                    ...prev,
                    page: {
                      ...prev.page,
                      data: next,
                    },
                  }))
                }
                templateId={state.page.template}
                onChangeTemplateId={handleTemplate}
              />
            )}
            {currentStep === 3 && <ServiceFileUpload />}
            {currentStep === 4 && (
              <div
                className="w-full h-full max-md:h-auto max-xl:flex max-xl:flex-col"
                //style={{ height: "calc(100% - 65px)" }}
              >
                <ServiceFormEditor
                  value={state.form}
                  onChange={(next) =>
                    setState((prev) => ({
                      ...prev,
                      form: next,
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ServiceEditContext.Provider>
  );
};

const ServiceEdit: FC = () => {
  const params = useParams<"id">();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EditServiceType | undefined>(undefined);

  const navigate = useNavigate();
  useLayoutEffect(() => {
    let mounted = true;
    if (params.id) {
      providerServiceApis
        .getServiceFullData(params.id)
        .then((res) => {
          if (mounted) {
            setData(res);
          }
        })
        .catch((e: ApiError) => {
          if (mounted) {
            setError(e.message);
          }
        });
    } else {
      setError("id 값이 존재하지 않습니다.");
    }
    return () => {
      mounted = false;
    };
  }, [params.id]);

  useHideFooter();

  if (typeof params.id === "undefined") {
    return <Navigate to="/404" replace />;
  }

  if (data === undefined) {
    return (
      <div className="bg-gray50 py-20">
        <AlertModal
          open={typeof error === "string"}
          title="알림"
          message={error}
          onClose={() => {
            navigate("/provider/service");
          }}
        />
        <LoadingIndicator />
      </div>
    );
  }

  return <ServiceEditCore initial_value={data} />;
};

export default ServiceEdit;
