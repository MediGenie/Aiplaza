import { useEffect, useState } from 'react';
import { mypageApis } from '../../../../apis/mypage';
import { PaginateData } from '../../../../types/paginate-data.interface';
import { PaymentListItem } from '../../../../types/payment';

export function useGetPaymentList() {
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('newest');
  const [data, setData] = useState<PaginateData<PaymentListItem>>({
    page_size: 0,
    rows: [],
    total_number: 0,
  });

  useEffect(() => {
    mypageApis
      .getPaymentList(page, order)
      .then(setData)
      .catch(() => {});
  }, [page, order]);

  return {
    ...data,
    page,
    setPage,
    order,
    setOrder,
  };
}
