import { FC, useState } from 'react';
import {
  ServiceFormContentManager,
  ServiceFormEditor,
} from '../components/ServiceFormEditor';

import {
  FormColumnType,
  ServiceFormSection,
} from '../components/ServiceFormEditor/types';
import { useHideFooter } from '../hooks/useHideFooter';

interface FormEditProps {}

const FormEdit: FC<FormEditProps> = () => {
  const [state, setState] = useState<ServiceFormSection[]>([
    {
      label: '',
      column: [
        { type: FormColumnType.TITLE, description: '', label: '', image: null },
        {
          type: FormColumnType.TEXT,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
        },
        {
          type: FormColumnType.NUMBER,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
        },
        {
          type: FormColumnType.FILE,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          allow_mime: [],
          limit_file_number: 1,
          limit_file_size: 1,
        },
        {
          type: FormColumnType.DROPROWN,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          items: ['', ''],
        },
        {
          type: FormColumnType.RADIO,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          etc_field: false,
          items: ['', ''],
        },
        {
          type: FormColumnType.CHECKBOX,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          etc_field: false,
          items: ['', ''],
          max_checkbox_count: 1,
        },
        {
          type: FormColumnType.SLIDE,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          min_slide: 0,
          max_slide: 100,
          fixed_slide: false,
        },
        {
          type: FormColumnType.SLIDE,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          min_slide: 0,
          max_slide: 100,
          fixed_slide: true,
        },
        {
          type: FormColumnType.SPINNER,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          spinner_init: 0,
        },
        {
          type: FormColumnType.LINEAR,
          description: '',
          label: '',
          image: null,
          table: null,
          required: false,
          max_linear: 10,
          min_linear: 0,
          max_linear_label: '10',
          min_linear_label: '0',
        },
      ],
      description: '',
    },
  ]);
  useHideFooter();
  return (
    <div className="h-full flex" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="max-w-[390px] px-10 w-full overflow-auto">
        <ServiceFormContentManager changeSections={setState} sections={state} />
      </div>
      <div className="flex-1">
        <ServiceFormEditor value={state} onChange={setState} />
      </div>
    </div>
  );
};

export default FormEdit;
