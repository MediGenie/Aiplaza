import { FC } from "react";
import { Link } from "react-router-dom";
import { WithDrawListItem } from "../../../../types/withdraw.type";

interface WithDrawalListTableProps {
  data?: WithDrawListItem[];
}

const WithDrawalListTableComponent: FC<WithDrawListItem> = ({
  state,
  service_name,
  created_at,
  buyer_email,
  price,
}) => {
  if (state === "정산") {
    state = "인출";
  } else if (state === "서비스 판매") {
    state = "구매";
  } else if (state === "결제 취소") {
    state = "구매취소";
  }

  return (
    <tr className="border-y-[1px] border-gray300 cursor-pointer">
      <td className="flex justify-center items-center py-4">
        <span className="text-blue500 text-b3 bg-gray100 py-[5px] px-2.5 rounded">
          {state}
        </span>
      </td>
      <td className="text-b3 max-w-[102px] leading-11 py-3 truncate text-ellipsis overflow-hidden text-left">
        {service_name ? service_name : "-"}
      </td>
      <td className="text-b3 leading-11 py-3 text-center">{created_at}</td>
      <td className="text-b3 leading-11 py-3 text-center">
        {buyer_email ? buyer_email : "-"}
      </td>
      <td className="text-b3 leading-11 py-3 text-center">{price}</td>
    </tr>
  );
};

const WithDrawalListTable: FC<WithDrawalListTableProps> = ({ data = [] }) => {
  return (
    <table className="relative w-full table-fixed">
      <thead>
        <tr>
          <th className="bg-black text-white text-center py-3 w-[102px]">
            분류
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[180px]">
            서비스명
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[110px]">
            날짜
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[188px]">
            구매자
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[150px]">
            금액
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="border-b border-gray300 py-5 w-full" colSpan={999}>
              <h2 className="text-center font-bold">
                서비스 결제내역이 존재하지 않습니다.
              </h2>
            </td>
          </tr>
        ) : (
          data.map((_item, index) => {
            return <WithDrawalListTableComponent {..._item} key={index} />;
          })
        )}
      </tbody>
    </table>
  );
};

WithDrawalListTable.defaultProps = {} as Partial<WithDrawalListTableProps>;

export default WithDrawalListTable;
