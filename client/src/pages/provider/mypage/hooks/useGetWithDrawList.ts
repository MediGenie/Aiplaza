import { useEffect, useLayoutEffect, useState } from "react";
import { mypageApis } from "../../../../apis/mypage";
import { ServiceListItem } from "../../../../types/service";
import {
  WithDrawListItem,
  WithDrawPaginateData,
} from "../../../../types/withdraw.type";

export function useGetWithDrawList() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<WithDrawPaginateData<WithDrawListItem>>({
    rows: [],
    page_size: 0,
    total_number: 0,
    totalRevenue: 0,
    totalWithdrawal: 0,
    totalBalance: 0,
  });

  useLayoutEffect(() => {
    mypageApis
      .getWithDrawList(page)
      .then((res) => {
        const arr = data.rows.concat(res.rows);
        setData({
          rows: arr,
          page_size: res.page_size,
          total_number: res.total_number,
          totalRevenue: res.totalRevenue,
          totalWithdrawal: res.totalWithdrawal,
          totalBalance: res.totalBalance,
        });
      })
      .catch(() => {});
  }, [page]);

  return {
    ...data,
    page,
    setPage,
  };
}
