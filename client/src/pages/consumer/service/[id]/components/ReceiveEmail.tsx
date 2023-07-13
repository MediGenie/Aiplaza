import { RadioGroup } from '@headlessui/react';
import { useField } from 'formik';
import { FC } from 'react';
import { FormRow } from '../../../../../components/FormRow';

interface ReceiveEmailProps {}

export const ReceiveEmail: FC<ReceiveEmailProps> = () => {
  const [props, , helper] = useField('receive_email');
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label="결과분석 완료 알람을 이메일로 받으시겠습니까?" required>
        <div className="space-y-5">
          <RadioGroup
            value={props.value}
            onChange={(next) => {
              helper.setValue(next);
            }}
            className="space-y-5 pt-3"
          >
            <RadioGroup.Option value={true}>
              {({ checked }) => {
                return (
                  <div className="flex space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-gray200 p-1">
                      {checked && (
                        <span
                          className="block w-full h-full rounded-full bg-blue500"
                          style={{
                            boxShadow: '0px 2px 4px rgba(28, 28, 30, 0.25)',
                          }}
                        ></span>
                      )}
                    </span>
                    <span className="text-b3">예</span>
                  </div>
                );
              }}
            </RadioGroup.Option>
            <RadioGroup.Option value={false}>
              {({ checked }) => {
                return (
                  <div className="flex space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-gray200 p-1">
                      {checked && (
                        <span
                          className="block w-full h-full rounded-full bg-blue500"
                          style={{
                            boxShadow: '0px 2px 4px rgba(28, 28, 30, 0.25)',
                          }}
                        ></span>
                      )}
                    </span>
                    <span className="text-b3">아니오</span>
                  </div>
                );
              }}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      </FormRow>
    </div>
  );
};
