import { FormikProvider, useFormik } from 'formik';
import { FC, useState, useLayoutEffect, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ApiError } from '../../../../apis/api-error';
import {
  consumerServiceApis,
  GetServiceFormResponse,
} from '../../../../apis/service';
import { LoadingIndicator } from '../../../../components/LoadingIndicator/LoadingIndicator';
import { useHideFooter } from '../../../../hooks/useHideFooter';
import { AlertModal } from '../../../../modals';
import { formSectionToDefaultValue } from '../../../../types/form-section-to-default-value';
import { formSectionToYups } from '../../../../types/form-section-to-yups';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { ServiceFormContext } from './context/service-form.context';
import { SectionViewer } from './SectionViewer';
import { ValidationError } from 'yup';
import { useRouteState } from '../../../../hooks/useRouteState';

interface ServiceUsageProps {
  data: GetServiceFormResponse;
}
const ServiceUsageCore: FC<ServiceUsageProps> = ({ data }) => {
  const routeState = useRouteState<{
    ticket_id: string;
  }>();
  const yups = useMemo(() => {
    return formSectionToYups(data.form);
  }, [data]);
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState({ show: false, message: '' });
  const showModal = (msg: string) => {
    setModal({ message: msg, show: true });
  };
  const hiddenModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const currentSection = data.form[step - 1];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: formSectionToDefaultValue(data.form),
    onSubmit: async (values, helper) => {
      try {
        yups.validateSync(values);

        const formdata = new FormData();
        formdata.append('service_id', data.service_id);
        formdata.append('ticket_id', routeState?.ticket_id || '');
        Object.entries(values).forEach((item) => {
          const [field, value] = item;
          if (value instanceof Array && value[0] instanceof File) {
            const obj = {
              type: 'file',
              value: [] as string[],
            };
            value.forEach((file, i) => {
              const file_field = `__FILE__${field}_${i}`;
              // const _field = `${field}[${i}]`;
              // formdata.append(_field, file_field);
              formdata.append(file_field, file);
              obj.value.push(file_field);
            });
            formdata.append(field, JSON.stringify(obj));
          } else {
            const obj = {
              type: 'normal',
              value,
            };
            formdata.append(field, JSON.stringify(obj));
          }
        });
        await consumerServiceApis.useService(formdata);
        helper.setSubmitting(false);
        if (values.receive_email === true) {
          navigate(`/consumer/service/${data.service_id}`);
        } else {
          navigate(`/consumer/service/waiting`, {
            state: {
              ticket_id: routeState?.ticket_id || '',
            },
          });
        }
      } catch (e) {
        helper.setSubmitting(false);
        if (e instanceof ApiError) {
          return showModal(e.message);
        } else if (e instanceof ValidationError) {
          const err: ValidationError = e as ValidationError;
          const regexp = /SECTION_([0-9]+)_ITEM_([0-9]+)/;
          const result = regexp.exec(err.path || '');
          if (result !== null) {
            const [, section_num, item_num] = result;
            if (section_num && item_num) {
              const msg = `섹션 ${section_num}의 항목 ${item_num}번에서 오류가 발생하였습니다.\n${err.message}`;
              return showModal(msg);
            }
          }
          return showModal('알 수 없는 오류가 발생하였습니다.');
        }
        return showModal('알 수 없는 오류가 발생하였습니다.');
      }
    },
  });

  return (
    <ServiceFormContext.Provider
      value={{
        step: step,
        onChangeStep: setStep,
        form_data: data.form,
      }}
    >
      <FormikProvider value={formik}>
        <div
          className="flex relative overflow-auto bg-gray50"
          style={{ height: 'calc(100vh - 60px)' }}
        >
          <AlertModal
            message={modal.message}
            open={modal.show}
            onClose={hiddenModal}
            title="알림"
          />
          <SideBar
            title={data.content.title}
            description={data.content.description}
            thumbnail={data.content.thumbnail}
          />
          <div className="flex-1 h-full overflow-auto relative">
            <Header title={data.content.title} />
            <div className="relative" style={{ height: 'calc(100% - 65px)' }}>
              {currentSection && (
                <SectionViewer
                  label={currentSection.label}
                  data={currentSection.column}
                  description={currentSection.description}
                  key={`SECTION_${step}`}
                  step={step}
                  isLast={step === data.form.length}
                />
              )}
            </div>
          </div>
        </div>
      </FormikProvider>
    </ServiceFormContext.Provider>
  );
};

const ServiceUsage: FC = () => {
  const params = useParams<'id'>();
  const routeState = useRouteState<{
    ticket_id: string;
  }>();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GetServiceFormResponse | undefined>(
    undefined
  );

  const navigate = useNavigate();
  useLayoutEffect(() => {
    let mounted = true;
    if (params.id) {
      consumerServiceApis
        .getServiceForm(params.id)
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
      setError('id 값이 존재하지 않습니다.');
    }
    return () => {
      mounted = false;
    };
  }, [params.id]);

  useHideFooter();

  if (
    typeof params.id === 'undefined' ||
    typeof routeState?.ticket_id === 'undefined'
  ) {
    return <Navigate to="/404" replace />;
  }

  if (data === undefined) {
    return (
      <div className="bg-gray50 py-20">
        <AlertModal
          open={typeof error === 'string'}
          title="알림"
          message={error}
          onClose={() => {
            navigate('/consumer/service');
          }}
        />
        <LoadingIndicator />
      </div>
    );
  }

  return <ServiceUsageCore data={data} />;
};

export default ServiceUsage;
