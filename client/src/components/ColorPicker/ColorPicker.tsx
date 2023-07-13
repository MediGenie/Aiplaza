import { Popover } from '@headlessui/react';
import { FC } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  value?: string;
  onChange?: (next: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Popover className="relative">
        <Popover.Button
          className="p-3 block w-full rounded border border-gray100"
          style={{ backgroundColor: value }}
        ></Popover.Button>
        <Popover.Panel className="absolute top-8 left-1/2 z-10 -translate-x-1/2 transform pb-4">
          <div className="bg-white border border-gray300 rounded p-4">
            <HexColorPicker
              className="mx-auto"
              color={value}
              onChange={onChange}
            />
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
