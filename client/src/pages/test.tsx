import { FC, useState } from 'react';
import { Button } from '../components/Button';
import { CheckBox } from '../components/CheckBox';
import { DropDown } from '../components/DropDown';
import { InputBox } from '../components/InputBox';
import { InputLine } from '../components/InputLine';
import { InputToggle } from '../components/InputToggle/InputToggle';

interface TestProps {}

export const Test: FC<TestProps> = () => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div className="container space-y-4 py-20">
      <li>
        <Button>Button</Button>
      </li>
      <li>
        <InputBox placeholder="InputBox" />
      </li>
      <li>
        <InputLine placeholder="InputLine" />
      </li>
      <li>
        <InputToggle value={toggle} onChange={setToggle} />
      </li>
      <li>
        <DropDown
          data={[{ label: '테스트', value: '테스트' }]}
          value={value}
          onChange={setValue}
          className="w-full"
        />
      </li>
      <li>
        <CheckBox value={toggle} onChange={setToggle} />
      </li>
    </div>
  );
};
