import { FC } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import ServiceListTable from './component/ServiceListTable';
import { useGetServiceList } from './hooks/useGetServiceList';

interface MyserviceProps {}

const Myservice: FC<MyserviceProps> = () => {
  const {
    page,
    page_size,
    rows,
    setPage,
    totalBuyer,
    totalUsed,
    total_number,
  } = useGetServiceList();
  return (
    <div className="container-sm w-full lg:min-h-[932px] py-20 space-y-10">
      <div className="flex lg:flex-row place-content-around lg:mb-10 py-[10px] lg:py-10 lg:h-[162px] border border-gray200 shadow-1">
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {total_number.toLocaleString('ko-KR')}
          </p>
          <div className="mt-2.5 text-gray800">등록 서비스</div>
        </div>
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {totalBuyer.toLocaleString('ko-KR')}
          </p>
          <div className="mt-2.5 text-gray800">구매자</div>
        </div>
        <div className="flex flex-col min-w-[100px] justify-center items-center">
          <p className="text-h2 font-bold text-blue500">
            {totalUsed.toLocaleString('ko-KR')}
          </p>
          <div className="mt-2.5 text-gray800">이용자</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <ServiceListTable data={rows} />
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

Myservice.defaultProps = {} as Partial<MyserviceProps>;

export default Myservice;
