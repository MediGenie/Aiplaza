import { FC } from 'react';
import { FileUpload } from '../../../../../components/FileUpload';
import { FormRow } from '../../../../../components/FormRow';
import { useServiceEditContext } from '../hooks/useServiceEditContext';

interface ServiceFileUploadProps {}

export const ServiceFileUpload: FC<ServiceFileUploadProps> = ({}) => {
  const { data, onChangeData } = useServiceEditContext();
  return (
    <div className="container-sm py-10">
      <div className="p-10 bg-white rounded border border-gray100">
        <FormRow label="서비스에 이용될 파일을 업로드해 주세요." required>
          <p className="text-b3 text-gray600 mb-2.5">
            파일은 추후 수정할 수 있습니다.
          </p>
          <FileUpload
            selected_file={data.service_file}
            onChange={(file) => {
              onChangeData({
                service_file: file,
              });
            }}
          />
        </FormRow>
      </div>
    </div>
  );
};
