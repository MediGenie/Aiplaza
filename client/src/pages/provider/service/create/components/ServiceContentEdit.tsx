import { FC } from 'react';
import { FileUpload } from '../../../../../components/FileUpload';
import { FormRow } from '../../../../../components/FormRow';
import { InputArea } from '../../../../../components/InputArea';
import { InputBox } from '../../../../../components/InputBox';
import { useServiceCreateContext } from '../hooks/useServiceCreateContext';

interface ServiceContentEditProps {}

export const ServiceContentEdit: FC<ServiceContentEditProps> = () => {
  const {
    onChangeData,
    data: { content },
  } = useServiceCreateContext();

  const changeData = (field: keyof typeof content, input: any) => {
    onChangeData({
      content: {
        ...content,
        [field]: input,
      },
    });
  };

  return (
    <div className="container-sm py-10 space-y-5">
      <div className="bg-white p-10 rounded border border-gray100">
        <FormRow label="서비스 제목" required>
          <InputBox
            className="block w-full"
            placeholder="서비스 제목을 입력해 주세요."
            value={content.title}
            onChange={(e) => {
              changeData('title', e.target.value);
            }}
          />
        </FormRow>
      </div>
      <div className="bg-white p-10 rounded border border-gray100">
        <FormRow label="서비스 소개" required>
          <InputArea
            className="block w-full"
            placeholder="서비스에 대한 소개를 입력해 주세요."
            value={content.description}
            onChange={(e) => {
              changeData('description', e.target.value);
            }}
          />
        </FormRow>
      </div>
      <div className="bg-white p-10 rounded border border-gray100">
        <FormRow label="썸네일 등록" required>
          <p
            className="text-gray600 mb-2.5"
            style={{ fontSize: 14, lineHeight: '22px' }}
          >
            썸네일에 표시될 이미지를 등록해 주세요.
          </p>
          <FileUpload
            accept="image/png,image/jpeg,image/jpg"
            selected_file={content.thumbnail}
            onChange={(file) => {
              const url = URL.createObjectURL(file);
              const _file = Object.assign(file, { url });
              changeData('thumbnail', _file);
            }}
          />
        </FormRow>
      </div>
      <div className="bg-white p-10 rounded border border-gray100">
        <FormRow label="담당 메일 주소" required>
          <InputBox
            className="block w-full"
            placeholder="문의사항을 받으실 담당자의 메일주소를 입력해 주세요."
            value={content.email}
            onChange={(e) => {
              changeData('email', e.target.value);
            }}
          />
        </FormRow>
      </div>
      <div className="bg-white p-10 rounded border border-gray100">
        <FormRow label="서비스 금액" required>
          <InputBox
            className="block w-full"
            placeholder="서비스 1회당 이용금액을 입력해 주세요."
            value={content.price}
            onChange={(e) => {
              const value = e.target.value;
              const numbered_value = parseInt(value);
              if (isNaN(numbered_value) === false) {
                changeData('price', numbered_value);
              }
            }}
          />
        </FormRow>
      </div>
    </div>
  );
};
