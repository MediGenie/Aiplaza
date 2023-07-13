import React, { useRef } from 'react';
import { columnHeader } from './columnHeader';
import Form from './Form';
import initialQuery from './initialQuery';
import CMS from '@core/CMS';
import Filter from './Filter';
import PaymentService from '../../../api/payment.service';

const searchType = [];

export default function Payment() {
  const paymentService = useRef(new PaymentService());
  return (
    <CMS
      Form={Form}
      service={paymentService.current}
      header="결제 관리"
      listProps={{
        attributes: columnHeader,
        initialQuery: initialQuery,
        searchType: searchType,
        RenderFilter: Filter,
        edit: false,
        create: false,
        deleteable: false,
      }}
    />
  );
}

export {
  Form as PaymentForm,
  columnHeader as PaymentColumnHeader,
  initialQuery as PaymentInitialQuery,
  searchType as PaymentSearchType,
};
