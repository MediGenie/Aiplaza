import { FC } from "react";

interface Template01ItemCardProps {
  image?: string;
  title?: string;
  titleColor?: string;
  content?: string;
  contentColor?: string;
}

export const Template01ItemCard: FC<Template01ItemCardProps> = ({
  title,
  image,
  content,
  titleColor = "#1C1C1E",
  contentColor = "#AEAEB2",
}) => {
  return (
    <div
      className="bg-white rounded-lg p-2.5 h-full"
      style={{ boxShadow: "0px 5px 4px 1px rgba(72, 72, 74, 0.1)" }}
    >
      <div className="w-full relative rounded-lg overflow-hidden bg-gray400">
        <div
          className="!bg-center !bg-cover !bg-no-repeat"
          style={{
            paddingTop: `${(120 / 170) * 100}%`,
            backgroundImage: image ? `url(${image})` : undefined,
          }}
        ></div>
      </div>
      <h2
        className="font-bold break-words"
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontSize: 14,
          lineHeight: "22px",
          color: titleColor,
        }}
      >
        {title || "제목을 입력해주세요."}
      </h2>
      <p
        className="text-b4 whitespace-pre-line break-words"
        style={{ color: contentColor, marginBottom: 8 }}
      >
        {content || "내용을 입력해 주세요."}
      </p>
    </div>
  );
};
