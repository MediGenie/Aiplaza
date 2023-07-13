import { FC } from 'react';

interface SideBarProps {
  thumbnail: string;
  title: string;
  description: string;
}

export const SideBar: FC<SideBarProps> = ({
  description,
  thumbnail,
  title,
}) => {
  return (
    <div
      className="bg-white border-r border-gray200 relative w-full overflow-auto"
      style={{
        maxWidth: 390,
        boxShadow: '5px 0px 8px 2px rgba(72, 72, 74, 0.1)',
      }}
    >
      <div className="flex space-x-2.5 py-5 px-10 border-b-4 border-gray100">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover object-center rounded-lg"
          style={{ width: 78, height: 78 }}
        />
        <div>
          <h1 className="text-b1 font-semibold">{title}</h1>
          <p className="text-b3 text-gray600">{description}</p>
        </div>
      </div>
    </div>
  );
};
