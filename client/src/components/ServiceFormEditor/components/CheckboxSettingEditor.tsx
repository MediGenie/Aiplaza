import { FC, useLayoutEffect } from 'react';
import { DropDown } from '../../DropDown';
import { InputToggle } from '../../InputToggle';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormCheckboxColumn } from '../types';

interface CheckboxSettingEditorProps extends ServiceFormCheckboxColumn {
  column: number;
  section: number;
}

export const CheckboxSettingEditor: FC<CheckboxSettingEditorProps> = ({
  column,
  section,
  required,
  etc_field,
  items,
  max_checkbox_count,
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
  const handleChangeEtcField = (next: boolean) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        etc_field: next,
      },
    });
  };
  const dropdownData = items.map((v, i) => {
    return { label: (i + 1).toString(), value: i + 1 };
  });

  const handleMaxCheckboxCount = (next: number) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        max_checkbox_count: next,
      },
    });
  };

  useLayoutEffect(() => {
    if (max_checkbox_count > items.length) {
      dispatch.updateItem({
        section,
        column,
        data: {
          max_checkbox_count: items.length,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">필수</p>
        <InputToggle value={required} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">기타옵션</p>
        <InputToggle value={etc_field} onChange={handleChangeEtcField} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">선택가능 갯수</p>
        <DropDown
          data={dropdownData}
          value={max_checkbox_count}
          onChange={handleMaxCheckboxCount}
          className="w-[120px]"
        />
      </div>
    </div>
  );
};
