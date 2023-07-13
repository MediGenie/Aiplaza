import { FC, useMemo, memo } from "react";
import { starfull } from "../icons";
import moment from "moment-timezone";

interface ReviewItemProps {
  _id: string;
  rate: number;
  email: string;
  created_at: Date | string;
  review: string;
}

const _ReviewItem: FC<ReviewItemProps> = (item) => {
  const _date = useMemo(() => {
    const mo = moment.tz(item.created_at, "Asia/Seoul");
    return mo.format("YYYY.MM.DD");
  }, [item.created_at]);
  return (
    <div key={item._id} className="space-y-2.5">
      <div className="flex items-center space-x-2 5">
        <div className="flex items-center space-x-[5px]">
          <img src={starfull} alt="별점" className="h-5" />
          <p className="text-b4">{item.rate.toFixed(1)}</p>
        </div>
        <div className="w-0.5 h-4 bg-gray200"></div>
        <p className="text-b4">{item.email}</p>
        <div className="w-0.5 h-4 bg-gray200"></div>
        <p className="text-b4">{_date}</p>
      </div>
      <div className="px-[15px] py-3 bg-gray100 rounded-b-lg rounded-r-lg">
        <p className="text-b3 text-gray800 whitespace-pre-wrap">
          {item.review}
        </p>
      </div>
    </div>
  );
};

export const ReviewItem = memo(_ReviewItem);
