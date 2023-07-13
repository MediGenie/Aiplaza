import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FilterButton } from "../../../assets";
import Pagination from "../../../components/Pagination/Pagination";
import { Select } from "../../../components/SelectButton/Select";
import PaymentListTable from "./component/PaymentListTable";
import { useGetPaymentList } from "./hooks/useGetPaymentList";

interface PaymentProps {}

const Payment: FC<PaymentProps> = () => {
  const { page, page_size, rows, setPage, order, setOrder, total_number } =
    useGetPaymentList();

  console.log(rows);
  return (
    <div className="container-sm w-full lg:min-h-[932px] py-20 space-y-10">
      <div className="flex justify-end mb-10">
        <Select
          data={[
            { value: "newest", label: "최신순" },
            { value: "hangeul", label: "가나다순" },
            { value: "userNum", label: "이용자순" },
          ]}
          setValue={setOrder}
          value={order}
          img={FilterButton}
          imgAlt="orderBy"
        />
      </div>
      <div className="overflow-x-auto">
        <PaymentListTable data={rows} />
      </div>
      <div className="flex justify-center mb-20">
        <Pagination
          currentPage={page}
          pageSize={page_size}
          totalNumber={total_number}
          containterClassName=""
          onChange={(next) => setPage(next)}
        />
      </div>
    </div>
  );
};

Payment.defaultProps = {} as Partial<PaymentProps>;

export default Payment;
