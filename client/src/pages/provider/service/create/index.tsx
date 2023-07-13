import { FC, useState, useCallback } from "react";
import { PageEditor } from "../../../../components/PageEditor";
import { templateIdEnum } from "../../../../components/PageEditor/enum/template-id";
import {
  ServiceFormContentManager,
  ServiceFormEditor,
} from "../../../../components/ServiceFormEditor";
import {
  FormColumnType,
  ServiceFormSection,
} from "../../../../components/ServiceFormEditor/types";
import { useHideFooter } from "../../../../hooks/useHideFooter";
import { template01DefaultValue } from "../../../../lib/template-1-default-value";
import { template02DefaultValue } from "../../../../lib/template-2-default-value";
import { template03DefaultValue } from "../../../../lib/template-3-default-value";
import { Header } from "./components/Header";
import { ServiceContentEdit } from "./components/ServiceContentEdit";
import { ServiceFileUpload } from "./components/ServiceFileUpload";
import { SideBar } from "./components/SideBar";
import { ServiceCreateContext } from "./context/service-create.context";
import { CreateServiceType } from "./types/service-create.types";

interface ServiceCreatePageProps {}

function objectCopy<T>(obj: any): T {
  const text = JSON.stringify(obj);

  return JSON.parse(text);
}

const ServiceCreatePage: FC<ServiceCreatePageProps> = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [createData, setCreateData] = useState<CreateServiceType>({
    content: {
      description: "",
      email: "",
      price: 0,
      thumbnail: null,
      title: "",
    },
    form: [
      {
        label: "",
        column: [
          {
            type: FormColumnType.TITLE,
            description: "",
            label: "",
            image: null,
          },
        ],
        description: "",
      },
    ],
    page: {
      data: objectCopy(template01DefaultValue),
      template: templateIdEnum.TEMPLATE_1,
    },
    service_file: null,
  });

  const onChangeStep = useCallback((next: number) => setCurrentStep(next), []);
  const onChangeData = useCallback((next: Partial<CreateServiceType>) => {
    setCreateData((prev) => ({ ...prev, ...next }));
  }, []);

  const handleTemplate = useCallback((id: templateIdEnum) => {
    if (id === templateIdEnum.TEMPLATE_1) {
      setCreateData((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template01DefaultValue),
        },
      }));
    }
    if (id === templateIdEnum.TEMPLATE_2) {
      setCreateData((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template02DefaultValue),
        },
      }));
    }
    if (id === templateIdEnum.TEMPLATE_3) {
      setCreateData((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          template: id,
          data: objectCopy(template03DefaultValue),
        },
      }));
    }
  }, []);
  useHideFooter();

  return (
    <ServiceCreateContext.Provider
      value={{
        data: createData,
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
        <div className="flex-1 h-full overflow-auto relative ">
          <Header />
          <div className="relative" style={{ height: "calc(100% - 65px)" }}>
            {currentStep === 1 && <ServiceContentEdit />}
            {currentStep === 2 && (
              <PageEditor
                value={createData.page.data}
                onChange={(next) =>
                  setCreateData((prev) => ({
                    ...prev,
                    page: {
                      ...prev.page,
                      data: next,
                    },
                  }))
                }
                templateId={createData.page.template}
                onChangeTemplateId={handleTemplate}
              />
            )}
            {currentStep === 3 && <ServiceFileUpload />}
            {currentStep === 4 && (
              <div
                className="w-full h-full max-md:h-auto max-xl:flex max-xl:flex-col"
                // style={{ height: "calc(100% - 65px)" }}
              >
                <ServiceFormEditor
                  value={createData.form}
                  onChange={(next) =>
                    setCreateData((prev) => ({
                      ...prev,
                      form: next,
                    }))
                  }
                  onChangeData={onChangeData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ServiceCreateContext.Provider>
  );
};

export default ServiceCreatePage;
