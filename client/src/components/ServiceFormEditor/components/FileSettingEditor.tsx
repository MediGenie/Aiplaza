import { FC } from 'react';
import { CheckBox } from '../../CheckBox';
import { DropDown } from '../../DropDown';
import { InputToggle } from '../../InputToggle';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormFileUploadColumn } from '../types';

interface FileSettingEditorProps extends ServiceFormFileUploadColumn {
  section: number;
  column: number;
}

export const FileSettingEditor: FC<FileSettingEditorProps> = ({
  column,
  section,
  required,
  allow_mime,
  limit_file_number,
  limit_file_size,
}) => {
  const dispatch = useFormDispatchContext();
  const handleChange = (next: boolean) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        required: next,
      },
    });
  };
  const allowBoolean: boolean = allow_mime === null ? false : true;
  const dicomAllowed =
    allow_mime === null ? false : allow_mime.includes('dicom');

  const imgAllowed = allow_mime === null ? false : allow_mime.includes('img');

  const miiAllowed = allow_mime === null ? false : allow_mime.includes('mii');

  const gifAllowed = allow_mime === null ? false : allow_mime.includes('gif');

  const handleAllowMimeCheckbox = (field: string) => (next: boolean) => {
    if (allow_mime === null) {
      return;
    }
    if (next === true) {
      const _next = Array.from(allow_mime);
      _next.push(field);
      dispatch.updateItem({
        section,
        column,
        data: {
          allow_mime: _next,
        },
      });
    } else {
      const _next = allow_mime.filter((v) => v !== field);
      dispatch.updateItem({
        section,
        column,
        data: {
          allow_mime: _next,
        },
      });
    }
  };

  const handleAllowMimeChange = (next: boolean) => {
    if (next === true) {
      dispatch.updateItem({
        section,
        column,
        data: {
          allow_mime: [],
        },
      });
    } else {
      dispatch.updateItem({
        section,
        column,
        data: {
          allow_mime: null,
        },
      });
    }
  };

  const handleChangeFileNumber = (next: number) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        limit_file_number: next,
      },
    });
  };
  const handleChangeFileSize = (next: number) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        limit_file_size: next,
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">필수</p>
        <InputToggle value={required} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">특정파일만 허용</p>
        <InputToggle value={allowBoolean} onChange={handleAllowMimeChange} />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center space-x-2.5">
          <CheckBox
            value={dicomAllowed}
            onChange={handleAllowMimeCheckbox('dicom')}
            disabled={allowBoolean === false}
          />
          <p className="t4ext-gray800 text-b3">dicom</p>
        </div>
        <div className="flex items-center space-x-2.5">
          <CheckBox
            value={imgAllowed}
            onChange={handleAllowMimeCheckbox('img')}
            disabled={allowBoolean === false}
          />
          <p className="t4ext-gray800 text-b3">img · hdr</p>
        </div>
        <div className="flex items-center space-x-2.5">
          <CheckBox
            value={miiAllowed}
            onChange={handleAllowMimeCheckbox('mii')}
            disabled={allowBoolean === false}
          />
          <p className="t4ext-gray800 text-b3">mii</p>
        </div>
        <div className="flex items-center space-x-2.5">
          <CheckBox
            value={gifAllowed}
            onChange={handleAllowMimeCheckbox('gif')}
            disabled={allowBoolean === false}
          />
          <p className="t4ext-gray800 text-b3">gif</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray800 text-b3">최대 파일 수</p>
        <DropDown
          data={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
          ]}
          value={limit_file_number}
          className="w-[120px]"
          onChange={handleChangeFileNumber}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray800 text-b3">최대 파일 크기</p>
        <DropDown
          data={[
            { label: '1MB', value: 1 },
            { label: '10MB', value: 10 },
            { label: '100MB', value: 100 },
            { label: '1GB', value: 1024 },
            { label: '5GB', value: 5120 },
          ]}
          value={limit_file_size}
          className="w-[120px]"
          onChange={handleChangeFileSize}
        />
      </div>
    </div>
  );
};
