import React, { useCallback, useEffect, useState } from 'react';
import { useCoreContext } from '@core/CMS/useCoreContext';
import { useParams } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { PaginationPresent } from '@core/CMS/Tables/Pagination';
import { dateFormatter } from '../../../formatters';

export default function DownloadList() {
  const { _id: id } = useParams();

  const [data, setData] = useState({
    data: [],
    totalPages: 0,
    total_number: 0,
  });
  const [page, setPage] = useState(1);
  const coreContext = useCoreContext();

  const fetch = useCallback(() => {
    let mounted = true;
    coreContext
      .getDownloadList(id, page)
      .then((res) => {
        if (mounted === true) {
          console.log(res);
          setData(res);
        }
      })
      .catch(() => {
        //NOTHING
      });
    return () => {
      mounted = false;
    };
  }, [coreContext, id, page]);

  useEffect(() => {
    return fetch();
  }, [fetch]);

  return (
    <div>
      <h2 className="mb-4">다운로드 내역</h2>
      <BootstrapTable
        keyField="index"
        classes="custom-table"
        data={data.data}
        columns={[
          {
            dataField: 'index',
            text: 'No.',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'created_at',
            text: '다운로드일',
            align: 'center',
            headerAlign: 'center',
            sort: false,
            formatter: (cell) => dateFormatter(cell, 'YYYY-MM-DD'),
          },
          {
            dataField: 'company',
            text: '회사명',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'industry',
            text: '업종',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'name',
            text: '성명',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'email',
            text: '이메일',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'tel',
            text: '연락처',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'department',
            text: '부서',
            align: 'center',
            headerAlign: 'center',
            sort: false,
          },
          {
            dataField: 'marketting_agree',
            text: '마케팅 활용에 대한 수집 · 이용 동의',
            align: 'center',
            headerAlign: 'center',
            sort: false,
            formatter: (cell) => (cell ? 'Y' : 'N'),
          },
        ]}
      />
      <PaginationPresent
        currentPage={page}
        totalPages={data.totalPages}
        onClick={setPage}
      />
    </div>
  );
}
DownloadList.propTypes = {};
DownloadList.defaultProps = {};
