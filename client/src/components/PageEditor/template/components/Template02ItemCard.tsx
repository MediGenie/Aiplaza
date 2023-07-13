import { FC } from 'react';

interface Template02ItemCardProps {
  image?: string;
  title?: string;
  titleColor?: string;
  content?: string;
  contentColor?: string;
}

export const Template02ItemCard: FC<Template02ItemCardProps> = ({
  image
}) => {
  return (
    <div
      className="bg-white rounded-tl-xl rounded-br-xl p-5"
      style={{ boxShadow: '0px 5px 18px 2px rgba(72, 72, 74, 0.1)' }}
    >
      <div className="w-full relative rounded-lg overflow-hidden bg-gray400">
        <div
          className="!bg-center !bg-cover !bg-no-repeat"
          style={{
            paddingTop: `100%`,
            backgroundImage: image ? `url(${image})` : undefined,
          }}
        ></div>
      </div>
      
    </div>
  );
};
