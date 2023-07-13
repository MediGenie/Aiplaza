import React, { useCallback, useRef } from 'react';
import { columnHeader } from './columnHeader';
import { validate } from './validate';
import Form from './Form';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import { useHistory } from 'react-router-dom';
import Filter from './Filter';
import SalesService from '../../../api/sales.service';
import { Button } from 'reactstrap';

const searchType = [];

export default function Sales() {
  const history = useHistory();

  const salesService = useRef(new SalesService());

  const RenderManage = useCallback(
    ({ cell }) => {
      const detailHandler = () => {
        history.push(`/sales/${cell._id}`);
      };

      return (
        <>
          <Button className="mx-1 cell-button mr-1" onClick={detailHandler}>
            보기
          </Button>
        </>
      );
    },
    [history],
  );

  return (
    <>
      <CMS
        Form={Form}
        service={salesService.current}
        validate={validate}
        header="매출 관리"
        listProps={{
          attributes: columnHeader,
          initialQuery: initialQuery,
          searchType: searchType,
          RenderFilter: Filter,
          RenderManage: RenderManage,
          create: true,
          edit: true,
          deleteable: false,
          create_label: '정산하기',
        }}
      />
    </>
  );
}

export {
  Form as SalesForm,
  columnHeader as SalesColumnHeader,
  validate as SalesValidate,
  initialQuery as SalesInitialQuery,
  searchType as SalesSearchType,
};
