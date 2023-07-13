import { useEffect, useState } from 'react';
import { mypageApis } from '../../../../apis/mypage';
import {
  ServiceListItem,
  ServicePaginateData,
} from '../../../../types/service';

export function useGetServiceList() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<ServicePaginateData<ServiceListItem>>({
    totalBuyer: 0,
    totalUsed: 0,
    page_size: 0,
    rows: [],
    total_number: 0,
  });

  useEffect(() => {
    mypageApis
      .getServiceList(page)
      .then(setData)
      .catch(() => {});
  }, [page]);

  return {
    ...data,
    page,
    setPage,
  };
}
