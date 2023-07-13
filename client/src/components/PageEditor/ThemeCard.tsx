import classNames from "classnames";
import { FC } from "react";

interface ThemeCardProps {
  image: any;
  title: string;
  onClick: () => void;
  isActive: boolean;
  background: string;
}

export const ThemeCard: FC<ThemeCardProps> = ({
  image,
  isActive,
  onClick,
  title,
  background,
}) => {
  return (
    <button
      className={classNames(
        "text-start block w-[310px] border-2 rounded-lg overflow-hidden",
        {
          "border-blue500": isActive,
          "border-transparent": !isActive,
        }
      )}
      style={{ boxShadow: "0px 4px 5px rgba(72, 72, 74, 0.1)" }}
      onClick={onClick}
    >
      <div className="p-5 pb-0" style={{ height: 180, background }}>
        <img src={image} alt="" className="w-full h-full" />
      </div>
      <div className="h-16 p-5">
        <span
          className={classNames("text-b2 font-medium", {
            "text-blue500": isActive,
            "text-gray600": !isActive,
          })}
        >
          {title}
        </span>
      </div>
    </button>
  );
};
