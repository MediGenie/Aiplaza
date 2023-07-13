import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaymentListItem } from "../../../../types/payment";
import { ApiError } from "../../../../apis/api-error";
import { AlertModal } from "../../../../modals";
import { mypageApis } from "../../../../apis/mypage";
import { ReviewModal } from "../../../../modals/ReviewModal";
import { RefundModal } from "../../../../modals/RefundModal";

interface PaymentListTableProps {
  data?: PaymentListItem[];
}

const PaymentListItemComponent: FC<PaymentListItem> = ({
  _id,
  index,
  name,
  created_at,
  price,
  payment_id,
  status,
}) => {
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState({ message: "", show: false });
  const [refundModal, setRefundModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const handleErrorModalClose = () => {
    setErrorModal((prev) => ({ ...prev, show: false }));
  };
  const handleRefundModalClose = () => {
    setRefundModal(false);
  };
  const handleUse = () => {
    navigate(`/consumer/service/${_id}`);
  };
  const handleRefund = () => {
    setRefundModal(true);
  };
  const patchReview = async (refundReason: string) => {
    try {
      await mypageApis.orderCancel(payment_id, refundReason);
      navigate(0);
    } catch (e: any) {
      const error = e as ApiError;
      if (error.type === "NORMAL") {
        setErrorModal({ message: error.message, show: true });
      }
    }
  };
  const handleReview = () => {
    setReviewModal(true);
  };

  return (
    <tr className="border-y-[1px] border-gray300">
      <td className="text-b3 leading-11 py-3 text-center">{index}</td>
      <td className="text-b3 max-w-[180px] leading-11 py-3 truncate text-ellipsis overflow-hidden text-left">
        <Link to={`/consumer/service/${_id}`}>{name}</Link>
      </td>
      <td className="text-b3 leading-11 py-3 text-center">{created_at}</td>
      <td className="text-b3 leading-11 py-3 text-center">{price}</td>
      <td className="text-b3 leading-11 py-3 text-center">
        {status === "이용전" ? (
          <div className="space-x-2.5">
            <button
              className="px-[10px] py-[5px] text-white text-b3 font-medium bg-blue500 rounded-[5px]"
              onClick={handleUse}
            >
              이용하기
            </button>
            <button
              className="px-[10px] py-[5px] text-white text-b3 font-medium bg-gray400 rounded-[5px]"
              onClick={handleRefund}
            >
              환불신청
            </button>
          </div>
        ) : status === "이용완료" ? (
          <button
            className="px-[10px] py-[5px] text-blue500 text-b3 font-medium bg-gray100 rounded-[5px]"
            disabled
          >
            이용완료
          </button>
        ) : status === "구매취소" ? (
          <button
            className="px-[10px] py-[5px] text-blue500 text-b3 font-medium bg-gray100 rounded-[5px]"
            disabled
          >
            환불완료
          </button>
        ) : status === "리뷰작성" ? (
          <button
            className="px-[10px] py-[5px] text-white text-b3 font-medium bg-blue500 rounded-[5px]"
            onClick={handleReview}
          >
            리뷰작성
          </button>
        ) : (
          <button
            className="px-[10px] py-[5px] text-blue500 text-b3 font-medium bg-gray100 rounded-[5px]"
            disabled
          >
            결제실패
          </button>
        )}
      </td>
      <RefundModal
        open={refundModal}
        func={patchReview}
        onClose={handleRefundModalClose}
      />
      <AlertModal
        title="오류"
        message={errorModal.message}
        open={errorModal.show}
        onClose={handleErrorModalClose}
      />
      <ReviewModal
        paymentId={payment_id}
        serviceName={name}
        open={reviewModal}
      />
    </tr>
  );
};

const PaymentListTable: FC<PaymentListTableProps> = ({ data = [] }) => {
  return (
    <table className="relative w-full table-fixed">
      <thead>
        <tr>
          <th className="bg-black text-white text-center py-3 w-[106px]">
            No.
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[180px]">
            서비스명
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[110px]">
            날짜
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[150px]">
            금액
          </th>
          <th className="break-normal bg-black text-white text-center py-3 w-[184px]">
            상태
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="border-b border-gray300 py-5 w-full" colSpan={999}>
              <h2 className="text-center font-bold">
                결제내역이 존재하지 않습니다.
              </h2>
            </td>
          </tr>
        ) : (
          data.map((_item, index) => {
            return <PaymentListItemComponent {..._item} key={index} />;
          })
        )}
      </tbody>
    </table>
  );
};

PaymentListTable.defaultProps = {} as Partial<PaymentListTableProps>;

export default PaymentListTable;
