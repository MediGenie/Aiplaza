import { FC } from 'react';
import { ServiceFormTitleColumn } from '../../../../../components/ServiceFormEditor/types';

interface TitleInputProps extends ServiceFormTitleColumn {
  name: string;
}

export const TitlePresenter: FC<TitleInputProps> = ({
  description,
  label,
  image,
}) => {
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <h1 className="text-b2 font-semibold mb-[5px]">{label}</h1>
      {description && (
        <p className="text-[14px] leading-[22px] text-gray600 mb-2.5">
          {description}
        </p>
      )}
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
    </div>
  );
};
