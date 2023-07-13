import { FC } from "react";
import { Link } from "react-router-dom";
import { ServiceListItem } from "../../../../types/service";

interface ServiceListTableProps {
  data?: ServiceListItem[];
}

const ServiceListItemComponent: FC<ServiceListItem> = ({
  _id,
  name,
  created_at,
  buyerNum,
  usedNum,
  price,
}) => {
  return (
    <tr className="border-y-[1px] border-gray300 cursor-pointer">
      <td className="text-b3 max-w-[180px] leading-11 py-3 truncate text-ellipsis overflow-hidden text-left">
        <Link to={`/provider/service/${_id}`}>{name}</Link>
      </td>
      <td className="text-b3 leading-11 py-3 text-center">{created_at}</td>
      <td className="text-b3 leading-11 py-3 text-center">{buyerNum}</td>
      <td className="text-b3 leading-11 py-3 text-center">{usedNum}</td>
      <td className="text-b3 leading-11 py-3 text-center">{price}</td>
    </tr>
  );
};

const ServiceListTable: FC<ServiceListTableProps> = ({ data = [] }) => {
  return (
    <table className="relative w-full table-fixed">
      <thead>
        <tr>
          <th className="bg-black text-white text-center py-3 w-[210px]">
            서비스명
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[150px]">
            서비스 등록일
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[110px]">
            구매자 수
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[110px]">
            이용자 수
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
                등록 서비스가 존재하지 않습니다.
              </h2>
            </td>
          </tr>
        ) : (
          data.map((_item) => {
            return <ServiceListItemComponent {..._item} key={_item._id} />;
          })
        )}
      </tbody>
    </table>
  );
};

ServiceListTable.defaultProps = {} as Partial<ServiceListTableProps>;

export default ServiceListTable;
